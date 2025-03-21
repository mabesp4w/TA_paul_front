/** @format */

import { TrendingUp } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  value: number;
  change?: string;
  positive?: boolean | null;
};

const StatCard = ({ title, value, change, positive }: Props) => {
  return (
    <div className="card bg-base-100 shadow transition-shadow hover:shadow-md">
      <div className="card-body p-5">
        <p className="text-sm opacity-70">{title}</p>
        <h2 className="card-title text-3xl font-bold my-1">{value}</h2>
        {change && (
          <div
            className={`text-xs flex items-center gap-1 ${
              positive ? "text-success" : ""
            }`}
          >
            {positive && <TrendingUp size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
