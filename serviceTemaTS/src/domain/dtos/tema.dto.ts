import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateTemaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string

  @IsNotEmpty()
  @IsString()
  uidEquipo: string

  @IsNotEmpty()
  @IsString()
  uidProyecto: string
}

export class UpdateTemaDto {
  @IsOptional()
  @IsString()
  nombre?: string

  @IsOptional()
  @IsNumber()
  orden?: number
}