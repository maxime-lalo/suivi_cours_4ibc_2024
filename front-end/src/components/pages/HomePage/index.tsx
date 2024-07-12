import Table, { ECellType } from "../../elements/Table";
import ConnectWallet from "../../materials/ConnectWallet";
import ContractMaterial from "../../materials/ContractMaterial";
import IsConnected from "../../materials/IsConnected";
import ConnectAccount from "../../materials/NavMenu/ConnectAccount";
import PageTemplate from "../PageTemplate";

export default function HomePage() {
    return (
        <PageTemplate tabTitle="Home">
            <Table
                tableHeads={[
                    {
                        cellType: ECellType.EURO,
                        label: "Prix",
                    },
                    {
                        cellType: ECellType.PERCENTAGE,
                        label: "Remise",
                    },
                    {
                        cellType: ECellType.TEXT,
                        label: "Nom",
                    },
                    {
                        cellType: ECellType.PATATE,
                        label: "Patate",
                    },
                ]}
                tableData={[
                    {
                        Remise: 50,
                        Nom: "Article",
                        Prix: 500000000,
                        Patate: "PATATE",
                    },
                    {
                        Prix: 100,
                        Remise: 10,
                        Nom: "Article 2",
                    },
                ]}
            />
            <IsConnected>
                <ConnectWallet />
                <ContractMaterial />
            </IsConnected>
            <ConnectAccount />
        </PageTemplate>
    );
}
