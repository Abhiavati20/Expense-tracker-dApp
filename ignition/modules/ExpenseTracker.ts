// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ExpenseTrackerModule = buildModule("ExpenseTrackerModule", (m) => {
  
  const lock = m.contract("ExpenseTracker", []);

  return { lock };
});

export default ExpenseTrackerModule;
