import OpenInNewIcon from '@/components/icons/OpenInNewIcon'
import styles from './styles.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        &copy; 2024 Shintaro Aoi
      </span>
      <a href="https://www.moyotsukai.dev/" target="_blank" rel="noopener noreferrer" className={styles.link}>
        <span>
          Portfolio
        </span>
        <OpenInNewIcon size={14} />
      </a>
    </footer>
  )
}