import { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Activity, BarChart3, Zap, Trophy, TrendingUp, Users } from "lucide-react";
import { generateABTestMetrics } from "../lib/analytics-data";

const chartColors = ["var(--color-primary)", "var(--color-accent)", "var(--color-warning)", "var(--color-info)", "var(--color-positive)"];
const axisColor = "var(--color-muted-foreground)";
const gridColor = "var(--color-border)";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 text-sm shadow-soft">
      {label && <p className="mb-1 font-semibold text-popover-foreground">{label}</p>}
      {payload.map((item) => (
        <p key={`${item.name}-${item.value}`} className="text-muted-foreground">
          <span className="font-medium text-foreground">{item.name}:</span> {item.value}
        </p>
      ))}
    </div>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: typeof BarChart3; eyebrow: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
    </div>
  );
}

function ChartCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`dashboard-card lift-on-hover rounded-3xl p-5 ${className}`}>{children}</section>;
}

function MetricComparison({ label, valueA, valueB, unitA, unitB }: { label: string; valueA: number; valueB: number; unitA: string; unitB: string }) {
  const isABetter = valueA > valueB;
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-4">
      <p className="mb-3 text-sm font-medium text-muted-foreground">{label}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Variant A</p>
          <p className={`mt-1 text-2xl font-semibold ${isABetter ? "text-positive" : "text-muted-foreground"}`}>
            {valueA} {unitA}
          </p>
          {isABetter && <p className="mt-1 text-xs text-positive">✓ Leading</p>}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Variant B</p>
          <p className={`mt-1 text-2xl font-semibold ${!isABetter ? "text-positive" : "text-muted-foreground"}`}>
            {valueB} {unitB}
          </p>
          {!isABetter && <p className="mt-1 text-xs text-positive">✓ Leading</p>}
        </div>
      </div>
    </div>
  );
}

export function ABTestingTab() {
  const metrics = useMemo(() => generateABTestMetrics(), []);

  // Generate conversion funnel data
  const funnelData = [
    { stage: "Landing Page", variantA: 12450, variantB: 12380, conversionA: 100, conversionB: 100 },
    { stage: "Product View", variantA: 9840, variantB: 10120, conversionA: 78.9, conversionB: 81.8 },
    { stage: "Add to Cart", variantA: 6234, variantB: 7450, conversionA: 50.0, conversionB: 60.1 },
    { stage: "Checkout", variantA: 4521, variantB: 5678, conversionA: 36.3, conversionB: 45.8 },
    { stage: "Purchase", variantA: 1248, variantB: 1456, conversionA: 10.0, conversionB: 11.7 },
  ];

  const ctaPerformance = [
    { cta: "Add to Cart", variantA: 24.5, variantB: 32.1 },
    { cta: "View Details", variantA: 18.3, variantB: 22.7 },
    { cta: "Continue", variantA: 15.2, variantB: 19.8 },
    { cta: "Checkout Now", variantA: 22.1, variantB: 28.5 },
  ];

  const deviceData = [
    { device: "Mobile", variantA: 6225, variantB: 6190, convA: 10.2, convB: 12.5 },
    { device: "Desktop", variantA: 4125, variantB: 4080, convA: 9.8, convB: 11.8 },
    { device: "Tablet", variantA: 2100, variantB: 2110, convA: 8.5, convB: 9.2 },
  ];

  const dailyTrend = [
    { date: "Jan 1", convA: 10.2, convB: 10.5 },
    { date: "Jan 5", convA: 10.0, convB: 10.8 },
    { date: "Jan 10", convA: 9.9, convB: 11.2 },
    { date: "Jan 15", convA: 10.1, convB: 11.5 },
    { date: "Jan 20", convA: 9.8, convB: 11.8 },
    { date: "Jan 25", convA: 10.0, convB: 12.1 },
    { date: "Jan 31", convA: 10.0, convB: 11.7 },
  ];

  const heatmapData = [
    { area: "Header CTA", variantA: 8.2, variantB: 12.5 },
    { area: "Hero Section", variantA: 15.3, variantB: 18.9 },
    { area: "Product Grid", variantA: 24.5, variantB: 28.3 },
    { area: "Sidebar Promo", variantA: 5.2, variantB: 8.7 },
    { area: "Footer CTA", variantA: 3.8, variantB: 5.4 },
  ];

  return (
    <main className="min-h-screen px-6 py-6 text-foreground">
      <div className="animate-dashboard-in">
        {/* Header */}
        <header className="relative mb-7 overflow-hidden rounded-[2rem] border border-border bg-[image:var(--gradient-hero)] p-6 shadow-lifted lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-sm font-medium text-muted-foreground shadow-soft">
              <Zap className="size-4 text-accent" /> A/B Testing Campaign
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-6xl">A/B Testing Analytics</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Compare performance between Variant A and Variant B. Track conversion uplift, user behavior, and CTA performance across all devices.
            </p>
          </div>
        </header>

        {/* Winner Indicator */}
        <section className="mb-7 grid gap-4 md:grid-cols-2">
          <ChartCard className="md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <SectionTitle icon={Trophy} eyebrow="Overall Winner" title={`Variant ${metrics.winner} leads`} />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-positive">{metrics.uplift}%</span>
                  <span className="text-lg text-muted-foreground">uplift for Variant {metrics.winner}</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-positive/20 to-positive/5 p-6">
                <p className="text-sm text-muted-foreground">Confidence Level</p>
                <p className="mt-2 text-3xl font-bold text-positive">{metrics.winnerConfidence.toFixed(1)}%</p>
              </div>
            </div>
          </ChartCard>
        </section>

        {/* Key Metrics */}
        <section className="mb-7 grid gap-4 md:grid-cols-3">
          <MetricComparison
            label="Conversion Rate"
            valueA={metrics.variantA.conversionRate}
            valueB={metrics.variantB.conversionRate}
            unitA="%"
            unitB="%"
          />
          <MetricComparison
            label="Avg Session Duration"
            valueA={metrics.variantA.avgSessionDuration}
            valueB={metrics.variantB.avgSessionDuration}
            unitA="s"
            unitB="s"
          />
          <MetricComparison
            label="Bounce Rate"
            valueA={metrics.variantA.bounceRate}
            valueB={metrics.variantB.bounceRate}
            unitA="%"
            unitB="%"
          />
        </section>

        {/* Conversion Funnel Comparison */}
        <section className="mb-7 grid gap-5 xl:grid-cols-2">
          <ChartCard>
            <SectionTitle icon={TrendingUp} eyebrow="Funnel Analysis" title="Conversion by stage" />
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={funnelData} layout="vertical" margin={{ left: 80, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical />
                  <XAxis type="number" stroke={axisColor} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="stage" stroke={axisColor} tickLine={false} axisLine={false} width={75} style={{ fontSize: "12px" }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="variantA" name="Variant A" fill="var(--color-primary)" radius={[0, 8, 8, 0]} />
                  <Bar dataKey="variantB" name="Variant B" fill="var(--color-accent)" radius={[0, 8, 8, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard>
            <SectionTitle icon={Activity} eyebrow="Conversion Rates" title="Stage conversion comparison" />
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={funnelData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="stage" stroke={axisColor} tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                  <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Line dataKey="conversionA" name="Variant A %" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} />
                  <Line dataKey="conversionB" name="Variant B %" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Heatmap & CTA Performance */}
        <section className="mb-7 grid gap-5 xl:grid-cols-2">
          <ChartCard>
            <SectionTitle icon={BarChart3} eyebrow="Click Distribution" title="Element heatmap comparison" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heatmapData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="area" stroke={axisColor} tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                  <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="variantA" name="Variant A" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="variantB" name="Variant B" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard>
            <SectionTitle icon={Zap} eyebrow="CTA Performance" title="Button performance metrics" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ctaPerformance} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="cta" stroke={axisColor} tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                  <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="variantA" name="Variant A" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="variantB" name="Variant B" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Device Breakdown */}
        <section className="mb-7 grid gap-5">
          <ChartCard>
            <SectionTitle icon={Users} eyebrow="Device Analysis" title="Performance across devices" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={deviceData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="device" stroke={axisColor} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke={axisColor} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke={axisColor} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="variantA" name="Variant A Visits" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  <Bar yAxisId="left" dataKey="variantB" name="Variant B Visits" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
                  <Line yAxisId="right" dataKey="convA" name="Variant A Conv. %" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 5" />
                  <Line yAxisId="right" dataKey="convB" name="Variant B Conv. %" stroke="var(--color-accent)" strokeWidth={2} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Daily Trend */}
        <section className="mb-7">
          <ChartCard>
            <SectionTitle icon={TrendingUp} eyebrow="Performance Trend" title="Conversion rate over time" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyTrend} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="date" stroke={axisColor} tickLine={false} axisLine={false} />
                  <YAxis stroke={axisColor} tickLine={false} axisLine={false} domain={[9, 13]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Line dataKey="convA" name="Variant A Conv. %" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} />
                  <Line dataKey="convB" name="Variant B Conv. %" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* AI Recommendation */}
        <section className="mb-7">
          <ChartCard>
            <div className="flex gap-4">
              <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-positive/20 text-positive">
                <Zap className="size-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">AI Recommendation</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong>Deploy Variant B</strong> with {metrics.uplift}% confidence. The improvement is statistically significant at {metrics.winnerConfidence.toFixed(1)}% confidence level. Variant B shows consistent improvement across mobile (+{(metrics.uplift * 0.85).toFixed(1)}%) and desktop (+{(metrics.uplift * 0.92).toFixed(1)}%) devices. Monitor bounce rate improvement on Variant B as it indicates stronger engagement.
                </p>
              </div>
            </div>
          </ChartCard>
        </section>
      </div>
    </main>
  );
}
