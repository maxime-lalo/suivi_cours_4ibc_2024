import { Link } from "react-router-dom";
import ModuleConfig from "../../../config/ModuleConfig";
import classes from "./classes.module.scss";
import { useAccount } from "wagmi";
import Balance from "../ConnectWallet/Account/Balance";
const pages = ModuleConfig.getInstance().getConfig().modules.pages;

export default function NavMenu() {
  const { address } = useAccount();
  return (
    <div className={classes["root"]}>
      <div className={classes["item"]}>
        <Link to={pages.Home.props.path}>Home</Link>
      </div>
      <div className={classes["item"]}>
        <Link to={pages.Test.props.path.replace(":seconds", "50")}>Test</Link>
      </div>
      <div className={classes["item"]}>
        <Link to={pages.Users.props.path}>Users</Link>
      </div>
      {address && (
        <div className={classes["item"]}>
          <Balance address={address} />
        </div>
      )}
    </div>
  );
}
