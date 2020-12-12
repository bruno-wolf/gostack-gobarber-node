import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import 'express-async-errors';

import UploadConfig from '@config/upload';
import AppError from "@shared/errors/AppError";
import routes from "@shared/infra/http/routes";

import "@shared/infra/typeorm";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));

app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, () => {
  console.log("");
  console.log("🐺🤟");
  console.log("server started on port 3333");
});