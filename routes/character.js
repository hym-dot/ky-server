const express = require("express")
const router = express.Router()

let characters = require('../models/characterModel')





//get 전체 조회
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: '전체 게시물 가져오기', characters })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// get 1개 데이터 가져오기
router.get('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const character = characters.find(item => item.id === charId)

        if (!character) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없음' })

        }
        return res.status(200).json({
            message: '1개 캐릭터 가져오기',
            character
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

//post 데이터 추가하기
router.post('/', (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || level === undefined || isOnline === undefined) {
            return res.status(400).json({ message: '이름, 레벨, isOnline을 입력하세요' })
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false
        }
        characters.push(newChar)

        res.status(200).json({ message: '캐릭터 등록 성공', characters })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

//put 수정하기
router.put('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = characters.findIndex(item => item.id === charId)

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없음' })

        }
        const updateData = req.body

        characters[index] = {
            ...characters[index],
            ...updateData
        }

        return res.status(200).json({
            message: '캐릭터 1개 수정하기 완료',
            character: characters[index]

        })
    } catch (error) {
        console.error("캐릭터 1개 수정하기 중 오류", error)
        res.status(500).json({ message: "서버오류", error })
    }
})

// //delete 삭제하기
router.delete('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = characters.findIndex(item => item.id === charId)

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터를 찾을 수 없음' })
        }

        characters.splice(index, 1)

        return res.status(201).json({
            message: '캐릭터 1개 삭제하기 완료',

        })
    } catch (error) {
        console.error("캐릭터 1개 삭제하기 중 오류", error)
        res.status(500).json({ message: "서버오류", error })
    }
})
module.exports = router