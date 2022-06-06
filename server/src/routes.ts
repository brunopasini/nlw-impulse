
import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedBackUseCase } from './use-cases/submit-feedback-use-case';


export const routes = express.Router()



routes.post('/feedbacks', async (request, response) => {

  const {type, comment, screenshot} = request.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedBackUseCase = new SubmitFeedBackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  await submitFeedBackUseCase.execute({
    type,
    comment,
    screenshot,
  })


  
    return response.status(201).send();
  });
  