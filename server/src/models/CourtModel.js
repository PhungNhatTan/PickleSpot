// src/models/CourtModel.js
import prisma from "./prisma.js";

class CourtModel {
  async findAll() {
    return prisma.court.findMany({
      include: { Owner: { include: { Account: true } } }
    });
  }

  async findById(id) {
    return prisma.court.findUnique({
      where: { Id: id },
      include: { Owner: { include: { Account: true } } }
    });
  }

  async create(data) {
    return prisma.court.create({ data });
  }

  async update(id, data) {
    return prisma.court.update({
      where: { Id: id },
      data
    });
  }

  async delete(id) {
    return prisma.court.delete({ where: { Id: id } });
  }
}

export default new CourtModel();
