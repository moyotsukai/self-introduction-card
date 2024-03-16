'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { ArrowUpIcon, PlusIcon } from '@radix-ui/react-icons'
import { drawGradation, drawImage, drawImageFrame, drawItem, drawName } from '@/features/canvas'

export default function Home() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>("")
  const [items, setItems] = useState<string[] | null>(null)
  const [currentItem, setCurrentItem] = useState<string>("")

  useEffect(() => {
    if (!canvasRef.current) { return }
    drawGradation(canvasRef.current)
    drawImageFrame(canvasRef.current)
  }, [])

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      setFile(file)
      if (!canvasRef.current) { return }
      drawImage({ canvas: canvasRef.current, file: file })
    }
  }

  const onClickDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) { return }
    let link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    const fileName = name === "" ? "self-introduction" : name
    link.download = `${fileName}.png`
    link.click()
  }

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onClickAddName = () => {
    if (!name) { return }
    if (!canvasRef.current) { return }
    drawName({ canvas: canvasRef.current, name: name })
    setItems([])
  }

  const onKeyDownOnAddName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onClickAddName()
    }
  }

  const onChangeCurrentItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem(event.target.value)
  }

  const onClickAddItem = () => {
    if (!canvasRef.current) { return }
    drawItem({ canvas: canvasRef.current, item: currentItem, index: Math.max(0, items?.length ?? 0) })
    if (!currentItem) { return }
    setItems((prev) => [...(prev ?? []), currentItem])
    setCurrentItem("")
  }

  const onKeyDownOnAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onClickAddItem()
    }
  }

  return (
    <div>
      <div className={styles.overlayContainer}>
        <canvas width={1920} height={1080} ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay}>
          <label htmlFor="file" className={file ? styles.inputFileLabelWithFile : styles.inputFileLabel}>
            <PlusIcon />
            写真
            <input type="file" accept="image/*" onChange={onChangeFile} className={styles.inputFile} />
          </label>
        </div>
      </div>
      {items === null
        ? (
          <div className={styles.inputTextContainer}>
            <input type="text" placeholder="名前を入力しよう！" value={name} onChange={onChangeName} onKeyDown={onKeyDownOnAddName} autoComplete="off" enterKeyHint="done" className={styles.inputText} />
            <button onClick={onClickAddName} className={styles.addButton}>
              <ArrowUpIcon width={24} height={24} />
            </button>
          </div>
        )
        : (
          <div className={styles.inputTextContainer}>
            <input type="text" placeholder="自分を構成する要素を書こう！" value={currentItem} onChange={onChangeCurrentItem} onKeyDown={onKeyDownOnAddItem} autoComplete="off" enterKeyHint="done" className={styles.inputText} />
            <button onClick={onClickAddItem} className={styles.addButton}>
              <ArrowUpIcon width={24} height={24} />
            </button>
          </div>
        )}
      <div className={styles.downloadContainer}>
        <button onClick={onClickDownload} className={styles.download}>
          カードをダウンロード
        </button>
      </div>
    </div>
  )
}