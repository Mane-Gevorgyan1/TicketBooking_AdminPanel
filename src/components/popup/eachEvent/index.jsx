import './style.css'
import CIcon from '@coreui/icons-react'
import { CloseIcon } from 'src/assets/svg'
import { useNavigate } from 'react-router-dom'
import { cilApplicationsSettings, cilApps, cilBook, cilCasino, cilPencil, cilPeople, cilSortAscending } from '@coreui/icons'

export const EachEventPopup = ({ open, setOpen, event }) => {
    const navigate = useNavigate()

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '570px' }}>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                <img alt='' src={`${process.env.REACT_APP_IMAGE}/${event?.image}`} className='eventPopupImage' />
                <div className='eventPopupDetails'>
                    <div className='eventEdit'>
                        <h1>{event?.title}</h1>
                        <div className='eventEditBg' onClick={() => navigate(`/edit-event/${event?._id}`)}>
                            <span><CIcon icon={cilPencil} /> Փոփոխել</span>
                        </div>
                    </div>
                    {event?.category?.length > 0 &&
                        <div className='eventGenres'>
                            <CIcon icon={cilApps} size='lg' />
                            <div className='eventGenresRight'>
                                {event?.category?.map((e, i) => (
                                    <div className='eachGenre' key={i}>
                                        {(i === event?.genre?.length + 1 || event?.genre?.length === 1)
                                            ? <span>{e?.name}</span>
                                            : <span>{e?.name},</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {event?.category?.length > 0 &&
                        <div className='eventGenres'>
                            <CIcon icon={cilApplicationsSettings} size='lg' />
                            <div className='eventGenresRight'>
                                <span>{event?.subcategory}</span>
                            </div>
                        </div>
                    }
                    {event?.genre?.length > 0 &&
                        <div className='eventGenres'>
                            <CIcon icon={cilCasino} size='lg' />
                            <div className='eventGenresRight'>
                                {event?.genre?.map((e, i) => (
                                    <div className='eachGenre' key={i}>
                                        {(i === event?.genre?.length + 1 || event?.genre?.length === 1)
                                            ? <span>{e}</span>
                                            : <span>{e},</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {event?.sponsors?.length > 0 &&
                        <div className='eventGenres'>
                            <CIcon icon={cilPeople} size='lg' />
                            <div className='eventGenresRight'>
                                {event?.sponsors?.map((e, i) => (
                                    <div className='eachGenre' key={i}>
                                        {(i === event?.genre?.length + 1 || event?.genre?.length === 1)
                                            ? <span>{e}</span>
                                            : <span>{e},</span>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div className='eventGenres'>
                        <CIcon icon={cilSortAscending} size='lg' />
                        <div className='eventGenresRight'>
                            {event?.generalEvent
                                ? <span>Գլխավոր</span>
                                : event?.topEvent
                                    ? <span>Թոփ</span>
                                    : <span>Բոլորը</span>
                            }
                        </div>
                    </div>
                    {event?.description?.length > 0 &&
                        <div className='eventDescription'>
                            <CIcon icon={cilBook} />
                            <p>{event?.description}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}