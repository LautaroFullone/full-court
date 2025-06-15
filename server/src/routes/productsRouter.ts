import { productSchema, productUpdateSchema } from '../models/product'
import { ResponseEntity } from '../lib/ResponseEntity'
import { Router, Request, Response } from 'express'
import prisma from '../lib/prismaClient'
import { sleep } from '../lib/sleep'
import { ApiError } from '../lib/ApiError'

const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const products = await prisma.product.findMany({
         orderBy: { createdAt: 'desc' },
      })

      return res.status(200).send({
         message: 'Productos obtenidos',
         products,
      })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

productsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   await sleep(2000)
   try {
      const data = productSchema.parse(req.body)

      const existingProduct = await prisma.product.findFirst({
         where: { name: data.name },
      })

      if (existingProduct) {
         throw new ApiError('Ya existe un producto con este nombre', { product: existingProduct })
      }

      const product = await prisma.product.create({ data })

      return res.status(201).send({ message: 'Producto creado', product })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

productsRouter.put('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params
      const productData = productUpdateSchema.parse(req.body)

      //TODO: verificar que el nuevo nombre no sea uno existente
      const productUpdated = await prisma.product.update({
         where: { id },
         data: productData,
      })

      return res.status(200).send({
         message: 'Producto actualizado',
         product: productUpdated,
      })
   } catch (error) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

productsRouter.delete('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params

      const productToDelete = await prisma.product.findFirst({
         where: { id },
      })

      if (!productToDelete) {
         throw new ApiError('Producto no encontrado')
      }

      await prisma.product.delete({ where: { id } })

      res.status(200).send({ message: 'Producto eliminado', product: productToDelete })
   } catch (error: any) {
      console.log(error)
      if (error instanceof ApiError) {
         return res.status(error.statusCode).send({
            message: error.message,
            ...error.data,
         })
      }

      return res.status(500).send({ message: 'Ocurrió un error inesperado del servidor' })
   }
})

export default productsRouter
