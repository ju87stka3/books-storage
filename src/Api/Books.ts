import { HOST_NAME } from "../Constants/constants"
import { IBook } from "../Type/IBooks"

export const getAllBooks=async():Promise<IBook[]>=>{
    
 const response=await fetch(`${HOST_NAME}/books/10`)
 return await response?.json()
}

export const getBookById=async(bookId:string):Promise<IBook>=>{
 const response=await fetch(`${HOST_NAME}/books/id/${bookId}`)
 return await response?.json()
}
