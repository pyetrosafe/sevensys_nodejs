import { Model, Column, Table, Scopes, CreatedAt, UpdatedAt, AllowNull, Length, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { DecimalDataType } from "sequelize/types";
import { Category } from './Category';

@Scopes(() => ({

}))
@Table
export class Product extends Model<Product> {

  @AllowNull(false)
  @Length({max: 100, min: 2})
  @Column
  title!: string;

  @AllowNull(false)
  @Column
  description!: string;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10,2) })
  value!: DecimalDataType;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column
  public categoryId: number;

  @BelongsTo(() => Category)
  public category: Category;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}