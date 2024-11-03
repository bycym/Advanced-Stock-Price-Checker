import { Entity, Column, PrimaryColumn } from "typeorm";
import { IStockPrice } from "@stockPrice/stock-price.interface";

export type IStockPriceEntity = IStockPrice;

@Entity()
export class StockPriceEntity implements IStockPriceEntity {
  // @PrimaryGeneratedColumn("uuid")
  // id!: string;

  @PrimaryColumn({
    type: "text",
    unique: true,
    nullable: false
  })
  symbol!: string;

  @Column({ type: "real", nullable: true })
  price!: number;

  @Column({ type: "time", nullable: true })
  updated!: Date;

  @Column({ type: "real", nullable: true })
  movingAverage!: number;
}
