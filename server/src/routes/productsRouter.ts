import { productSchema, productUpdateSchema } from '../models/product'
import { Router, Request, Response } from 'express'
import prisma from '../lib/prismaClient'
import { Product } from '@prisma/client'

interface ResponseEntity {
   message: string
   product?: Product
   products?: Product[]
   error?: unknown
}

const productsRouter = Router()

productsRouter.get('/', async (_req: Request, res: Response<ResponseEntity>) => {
   try {
      const products = await prisma.product.findMany({
         orderBy: { createdAt: 'desc' },
      })

      res.status(200).send({
         message: 'Productos obtenidos',
         products,
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Error obteniendo los productos', error })
   }
})

productsRouter.post('/', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const data = productSchema.parse(req.body)

      const existingProduct = await prisma.product.findFirst({
         where: { name: data.name },
      })

      if (existingProduct) {
         res.status(400).send({
            message: 'Ya existe un producto con este nombre',
            product: existingProduct,
         })
         return
      }
      const product = await prisma.product.create({ data })

      res.status(201).send({ message: 'Producto creado', product })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         message: 'Error creando el producto',
         error,
      })
   }
})

productsRouter.put('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params
      const productData = productUpdateSchema.parse(req.body)

      const productUpdated = await prisma.product.update({
         where: { id },
         data: productData,
      })

      res.status(200).send({
         message: 'Producto actualizado',
         product: productUpdated,
      })
   } catch (error) {
      res.status(500).send({
         message: 'Error actualizando el producto',
         error,
      })
   }
})

productsRouter.delete('/:id', async (req: Request, res: Response<ResponseEntity>) => {
   try {
      const { id } = req.params

      const productToDelete = await prisma.product.findFirst({
         where: { id },
      })

      if (!productToDelete) {
         res.status(404).send({ message: 'Producto no encontrado' })
         return
      }

      await prisma.product.delete({ where: { id } })

      res.status(200).send({ message: 'Producto eliminado', product: productToDelete })
   } catch (error: any) {
      console.log(error)
      res.status(500).send({
         message: 'Error eliminando el producto',
         error,
      })
   }
})

export default productsRouter
