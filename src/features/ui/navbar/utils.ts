export const closeIfClickedOnAnchor = (e: React.MouseEvent<HTMLElement>, onClick: () => void) => {
    const clickedElement = e.target
    if (!(clickedElement instanceof HTMLAnchorElement)) return
    setTimeout(() => onClick(), 30)
}