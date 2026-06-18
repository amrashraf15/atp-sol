import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { PLAYERS } from "@/lib/tennis-data";

const axisStyle = { fontSize: 11, fill: "oklch(0.65 0.02 130)" };
const grid = "oklch(0.30 0.02 150 / 0.4)";
const tooltipStyle = {
  background: "oklch(0.18 0.018 150)",
  border: "1px solid oklch(0.30 0.02 150 / 0.6)",
  borderRadius: 6,
  fontSize: 12,
};

export function PointsProgressionChart({
  data,
}: {
  data: { label: string; p1: number; p2: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PLAYERS[0].color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={PLAYERS[0].color} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PLAYERS[1].color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={PLAYERS[1].color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "oklch(0.85 0.01 120)" }} />
        <Area type="monotone" dataKey="p1" name={PLAYERS[0].shortName} stroke={PLAYERS[0].color} strokeWidth={2} fill="url(#g1)" />
        <Area type="monotone" dataKey="p2" name={PLAYERS[1].shortName} stroke={PLAYERS[1].color} strokeWidth={2} fill="url(#g2)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function H2HBarChart({ data }: { data: { surface: string; p1: number; p2: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="surface" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="p1" name={PLAYERS[0].shortName} fill={PLAYERS[0].color} radius={[3, 3, 0, 0]} />
        <Bar dataKey="p2" name={PLAYERS[1].shortName} fill={PLAYERS[1].color} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RankingProgressionChart({
  data,
}: {
  data: { label: string; p1: number; p2: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis reversed domain={[1, 2]} ticks={[1, 2]} tick={axisStyle} axisLine={false} tickLine={false} width={24} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="p1" stroke={PLAYERS[0].color} strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="p2" stroke={PLAYERS[1].color} strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
