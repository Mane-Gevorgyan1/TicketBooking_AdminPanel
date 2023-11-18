import { CSpinner } from '@coreui/react'

export const Loading = () => {
    return (
        <div className='activePopup' >
            <CSpinner style={{ width: '3rem', height: '3rem' }} />
        </div>
    )
}