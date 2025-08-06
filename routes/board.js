const express = require("express")
const router = express.Router()

let boards = require('../models/boardModel')




router.get('/',(req,res)=>{
    try {
        res.status(200).json({message:'전체 게시물 가져오기',boards})
    } catch (error) {
        res.status(500).json({message:"서버오류",error})
    }
})

// 1개 데이터 가져오기
router.get('/:id', (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const board = boards.find(item => item.id === boardId)

        if (!board) {
            return res.status(404).json({ message: '게시물을 찾을수 없음' })

        }
        return res.status(200).json({
            message: '1개 게시물 가져오기',
            board
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})


module.exports = router