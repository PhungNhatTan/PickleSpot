// src/models/AccountModel.js
import prisma from "./prisma.js";

class AccountModel {
  async findAll() {
    return prisma.account.findMany({
      include: { Admin: true, CourtOwner: true }
    });
  }

  async findById(id) {
    return prisma.account.findUnique({
      where: { Id: id },
      include: { Admin: true, CourtOwner: true }
    });
  }

  async create(data) {
    return prisma.account.create({ data });
  }

  async update(id, data) {
    return prisma.account.update({
      where: { Id: id },
      data
    });
  }

  async delete(id) {
    return prisma.account.delete({ where: { Id: id } });
  }
}

export default new AccountModel();
