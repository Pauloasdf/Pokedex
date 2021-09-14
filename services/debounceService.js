import { useMemo, useState } from 'react'

/**
 * Debounce a function by time
 * @param {Function} func
 * @param {Number} delay
 */

export default function debounce(func, delay = 800) {
    debugger;
    const [id, setId] = useState(null)

    return useMemo(
        (...args) => {
            if (id) {
                clearTimeout(id)
            } else {
                setId(
                    setTimeout(() => {
                        setId(null)
                        func(...args)
                    }, delay)
                )
            }
        },
        [func]
    )
}
