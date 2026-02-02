import { describe, expect, it, vi } from 'vitest';
import { BASELINE_DATA, ingestData, parseCSVText } from './App.jsx';

const clone = (value) => JSON.parse(JSON.stringify(value));

function runIngest(report, seed) {
  let updated;
  const setDashboardData = (updater) => {
    updated = updater(clone(seed));
  };
  ingestData(report, seed, setDashboardData);
  return updated;
}

describe('parseCSVText', () => {
  it('parses numbers and strings with headers', () => {
    const input = 'a,b\n1,hello';
    const result = parseCSVText(input);
    expect(result.errors).toHaveLength(0);
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toEqual({ a: 1, b: 'hello' });
  });

  it('returns an error when only a header row is provided', () => {
    const input = 'a,b';
    const result = parseCSVText(input);
    expect(result.data).toHaveLength(0);
    expect(result.errors[0]?.message).toMatch(/header row/i);
  });
});

describe('ingestData', () => {
  it('ingests ESD quarterly data and computes deltas', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-02T12:00:00Z'));

    const seed = { ...clone(BASELINE_DATA), deltas: {}, lastUpdated: null };
    const report = {
      type: 'esd_quarterly',
      quarter: 'Q1 (Jul-Sep)',
      fiscalYear: 'FY2025/26',
      data: [
        {
          smesSupported: '120',
          revenueGenerated: '300',
          contractsSecured: '150',
          jobsCreated: '100',
          jobsSustained: '50',
          womenOwned: '60',
          youthOwned: '30',
          disabilityOwned: '2',
        },
      ],
    };

    const updated = runIngest(report, seed);

    expect(updated.impactKPIs.smesSupported.value).toBe(120);
    expect(updated.impactKPIs.revenueGenerated.value).toBe(300);
    expect(updated.impactKPIs.contractsSecured.value).toBe(150);
    expect(updated.impactKPIs.jobsCreated.value).toBe(150);
    expect(updated.demographicData).toEqual([
      { name: 'Women-owned', value: 60, color: seed.demographicData[0].color },
      { name: 'Youth-owned', value: 30, color: seed.demographicData[1].color },
      { name: 'Disability-owned', value: 2, color: seed.demographicData[2].color },
      { name: 'Other', value: 8, color: seed.demographicData[3].color },
    ]);
    expect(updated.deltas.smesSupported).toBe(Math.round(((120 - 106) / 106) * 100));
    expect(updated.lastUpdated).toBe(new Date('2026-02-02T12:00:00Z').toISOString());
    expect(updated.revenueTimeline.some((r) => r.quarter === 'Q1 20')).toBe(true);

    vi.useRealTimers();
  });

  it('ingests LED quarterly data', () => {
    const seed = { ...clone(BASELINE_DATA), deltas: {}, lastUpdated: null };
    const report = {
      type: 'led_quarterly',
      data: [{ ledJobs: '200', ledInvestment: '210', ledSMMEs: '160' }],
    };

    const updated = runIngest(report, seed);

    expect(updated.impactKPIs.jobsCreated.value).toBe(1121 + 200);
    expect(updated.impactKPIs.communityInvestment.value).toBe(210);
    expect(updated.impactKPIs.smmeOpportunities.value).toBe(160);
  });

  it('updates provincial metrics for matching province', () => {
    const seed = { ...clone(BASELINE_DATA), deltas: {}, lastUpdated: null };
    const report = {
      type: 'provincial',
      data: [
        {
          province: 'Gauteng',
          esdSMEs: '99',
          ledJobs: '500',
          ledSMMEs: '60',
          ledInvestment: '75',
          womenOwned: '58',
          youthOwned: '25',
        },
      ],
    };

    const updated = runIngest(report, seed);
    const gp = updated.provincialDetail.Gauteng;

    expect(gp.esdSMEs).toBe(99);
    expect(gp.ledJobs).toBe(500);
    expect(gp.ledSMMEs).toBe(60);
    expect(gp.ledInvestment).toBe(75);
    expect(gp.womenOwned).toBe(58);
    expect(gp.youthOwned).toBe(25);
  });
});
