const express = require("express")
const router = express.Router()
const Character = require('../models/characterModel')
// const { message } = require("statuses")

//get
router.get('/', async (req, res) => {
    try {

        const characters = await Character.find()


        res.status(200).json({ message: '캐릭터 전체 조회하기 성공', characters })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

//post
router.post('/', async (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }
        const newChar = new Character({
            name,
            level,
            isOnline: isOnline ?? false
        })

        const saveChar = await newChar.save()

        res.status(200).json({ message: '캐릭터 추가하기 성공', character: saveChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

//get/:id
router.get('/:id', async (req, res) => {
    try {

        const charId = req.params.id

        const characters = await Character.findById(charId)

        if (!character) {
            res.status(404).json({ message: '캐릭터를 찾을 수 없음', character })
        }
        res.status(200).json({ message: '캐릭터 조회하기 성공', character })


        res.status(200).json({ message: '캐릭터 전체 조회하기 성공', characters })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

//put
router.put('/:id', async (req, res) => {
    try {

        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }

        const updateChar = await Character.findByIdAndUpdate(
            req.params.id,
            {
                name,
                level,
                isOnline
            }, {
            new: true,
            runValidators: true
        }
        )

        if (!updateChar) {
            res.status(404).json({ message: '캐릭터 를 찾을 수 없습니다.' })
        }
        res.status(200).json({ message: '캐릭터 수정하기 성공', character: updateChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {

        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }

        const updateChar = await Character.findByIdAndDelete(
            req.params.id,
            {
                name,
                level,
                isOnline
            }, {
            new: true,
            runValidators: true
        }
        )

        if (!updateChar) {
            res.status(404).json({ message: '캐릭터 를 찾을 수 없습니다.' })
        }
        res.status(200).json({ message: '캐릭터 삭제하기 성공', character: updateChar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '서버오류', error })
    }
})


module.exports = router