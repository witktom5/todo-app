import { Link } from "react-router-dom";
import { ReactNode } from "react";
type Props = {
  children: ReactNode | ReactNode[];
  url: string | null;
};

function ConditionalLink({ children, url }: Props) {
  return url ? <Link to={url}>{children}</Link> : <div>{children}</div>;
}
export default ConditionalLink;
