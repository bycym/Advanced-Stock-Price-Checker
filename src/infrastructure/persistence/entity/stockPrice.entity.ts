import { Entity, Column, PrimaryColumn } from "typeorm";
import { IStockPrice } from "@domain/model/StockPrice";

export type IStockPriceEntity = IStockPrice;

@Entity()
export class StockPriceEntity implements IStockPriceEntity {
  // @PrimaryGeneratedColumn("uuid")
  // id!: string;

  @PrimaryColumn("text")
  symbol!: string;

  @Column({ type: "number" })
  stockPrice!: number;

  @Column({ type: "date" })
  updated!: Date;

  @Column({ type: "number" })
  movingAverage!: number;
}
