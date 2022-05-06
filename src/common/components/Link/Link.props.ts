import { ReactNode } from "react";
import { Targets } from "src/common/types";

export interface LinkProps {
  id?: string;
  className?: string;
  url: string;
  target?: Targets;
  children: ReactNode;
}

export const defaultProps: Partial<LinkProps> = {};