import AccountModel from "../models/AccountModel.js";

export async function getAccounts(req, res) {
  try {
    const accounts = await AccountModel.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
}

export async function createAccount(req, res) {
  try {
    const { UserName, Password, Email, DisplayName, Role } = req.body;
    const account = await AccountModel.create({ UserName, Password, Email, DisplayName, Role });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: "Failed to create account" });
  }
}
