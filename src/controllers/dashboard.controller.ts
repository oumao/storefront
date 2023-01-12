// import { DashboardQueries } from "../models/dashboard.service"
// import { Request, Response } from "express"

// const dashboard = new DashboardQueries()

// export const getUserOrder =async (_req: Request, res: Response) => {
//     try {
//         const userId = _req.params.user_id
//         const result = await dashboard.getUserWithOrder(_req.params.user_id)
        
//         if(!result){
//             res.status(404).json(`No user with id ${userId}`)
//         }
//         res.status(200).json(result)
//     } catch (error) {
        
//     }
// }


// export const getUsersOrder =async (_req: Request, res: Response) => {
//     try {
//         const result = await dashboard.getUsersWithOrders()
//         res.status(200).json(result)
//     } catch (error) {
        
//     }
// }

// export const getProductsOrders =async (_req: Request, res: Response) => {
//     try {
//         const userId = _req.params.user_id
//         const result = await dashboard.getProductsInOrders()
        
//         if(!result){
//             res.status(404).json(`No user with id ${userId}`)
//         }
//         res.status(200).json(result)
//     } catch (error) {
        
//     }
// }

// export const getUserOrder =async (_req: Request, res: Response) => {
//     try {
//         const userId = _req.params.user_id
//         const result = await dashboard.getUserWithOrder(_req.params.user_id)
        
//         if(!result){
//             res.status(404).json(`No user with id ${userId}`)
//         }
//         res.status(200).json(result)
//     } catch (error) {
        
//     }
// }



