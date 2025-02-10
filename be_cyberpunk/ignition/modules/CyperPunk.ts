import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";

dotenv.config();

export default buildModule("CyberPunkModule", (m) => {
    const cyberPunkBoutique = m.contract("CyberPunkBoutique");

    return { cyberPunkBoutique };
});