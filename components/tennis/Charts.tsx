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

const axisStyle = {
  fontSize: 11,
  fill: "oklch(0.65 0.02 130)",
};

const grid = "oklch(0.30 0.02 150 / 0.4)";

const tooltipStyle = {
  background: "oklch(0.18 0.018 150)",

  border: "1px solid oklch(0.30 0.02 150 / 0.6)",

  borderRadius: 6,

  fontSize: 12,
};

// ===============================
// Points Progression
// ===============================

export function PointsProgressionChart({
  data,

  players,
}: {
  data: {
    label: string;
    p1: number;
    p2: number;
  }[];

  players: {
    p1: {
      shortName: string;
      color: string;
    };

    p2: {
      shortName: string;
      color: string;
    };
  };
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 16,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="player1Gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={players.p1.color} stopOpacity={0.5} />

            <stop offset="100%" stopColor={players.p1.color} stopOpacity={0} />
          </linearGradient>

          <linearGradient id="player2Gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={players.p2.color} stopOpacity={0.5} />

            <stop offset="100%" stopColor={players.p2.color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />

        <XAxis
          dataKey="label"
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
        />

        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={40} />

        <Tooltip contentStyle={tooltipStyle} />

        <Area
          type="monotone"
          dataKey="p1"
          name={players.p1.shortName}
          stroke={players.p1.color}
          strokeWidth={2}
          fill="url(#player1Gradient)"
        />

        <Area
          type="monotone"
          dataKey="p2"
          name={players.p2.shortName}
          stroke={players.p2.color}
          strokeWidth={2}
          fill="url(#player2Gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ===============================
// Titles / H2H Chart
// ===============================

export function H2HBarChart({
  data,

  players,
}: {
  data: {
    surface: string;
    p1: number;
    p2: number;
  }[];

  players: {
    p1: {
      shortName: string;
      color: string;
    };

    p2: {
      shortName: string;
      color: string;
    };
  };
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 16,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />

        <XAxis
          dataKey="surface"
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
        />

        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />

        <Tooltip contentStyle={tooltipStyle} />

        <Legend
          wrapperStyle={{
            fontSize: 11,
          }}
        />

        <Bar
          dataKey="p1"
          name={players.p1.shortName}
          fill={players.p1.color}
          radius={[3, 3, 0, 0]}
        />

        <Bar
          dataKey="p2"
          name={players.p2.shortName}
          fill={players.p2.color}
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ===============================
// Ranking Chart
// ===============================

export function RankingProgressionChart({
  data,

  players,
}: {
  data: {
    label: string;
    p1: number;
    p2: number;
  }[];

  players: {
    p1: {
      shortName: string;
      color: string;
    };

    p2: {
      shortName: string;
      color: string;
    };
  };
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid stroke={grid} strokeDasharray="3 4" vertical={false} />

        <XAxis
          dataKey="label"
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          reversed
          domain={[1, 2]}
          ticks={[1, 2]}
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip contentStyle={tooltipStyle} />

        <Line
          type="monotone"
          dataKey="p1"
          name={players.p1.shortName}
          stroke={players.p1.color}
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="p2"
          name={players.p2.shortName}
          stroke={players.p2.color}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
