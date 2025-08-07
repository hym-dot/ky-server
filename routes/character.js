const express = require("express")
const router = express.Router()
const Character = require('../models/characterModel')
// const { message } = require("statuses")

router.post('/',async(req,res)=>{
    try {
        const {name, level, isOnline}=req.body

        if(!name || typeof level !=='number'){
            return res.status(400).json({message:'name과 level은 필수 입니다.'})
        }
        const newChar =new Character({
            name, 
            level,
            isOnline:isOnline ?? false
        })

        const saveChar = await newChar.save()

        res.status(200).json({message:'캐릭터 추가하기 성공',character:saveChar})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'서버오류',error})
    }
})




module.exports = router