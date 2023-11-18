import './style.css'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import Checkbox from 'antd/es/checkbox/Checkbox'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { cilDelete, cilPencil, cilSave } from '@coreui/icons'
import { ChangeModeratorSettings, DeleteModerator, GetAllModerators } from 'src/services/action/user_action'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CFormInput, CListGroup, CListGroupItem } from '@coreui/react'

const AllModerators = () => {
    const dispatch = useDispatch()
    const moderators = useSelector(st => st.User_reducer.moderators)
    const update = useSelector(st => st.User_reducer.update)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [editModerator, setEditModerator] = useState(null)
    const [newModeratorName, setNewModeratorName] = useState('')

    useEffect(() => {
        dispatch(GetAllModerators())
        setNewModeratorName('')
        setEditModerator(null)
    }, [dispatch, update])

    function handleModeratorEdit(moderator) {
        setEditModerator(moderator)
        setNewModeratorName(moderator?.name)
    }

    return (<>
        {loading
            ? <Loading />
            : <div className='allModerators'>
                {moderators?.length > 0
                    ? moderators?.map((e, i) => (
                        <CCard style={{ width: '31%' }} key={i}>
                            <CCardBody>
                                {editModerator === e
                                    ? <div className='moderatorName moderatorNameChange'>
                                        <CFormInput
                                            value={newModeratorName}
                                            onChange={e => setNewModeratorName(e.target.value)}
                                        />
                                        <CButton color='success' onClick={() => dispatch(ChangeModeratorSettings({ id: e?._id, name: newModeratorName }))}>
                                            <CIcon icon={cilSave} />
                                        </CButton>
                                    </div>
                                    : <div className='moderatorName'>
                                        <CCardTitle className='moderatorName'>{e?.name}</CCardTitle>
                                        <div className='categoryIcons'>
                                            <CButton onClick={() => handleModeratorEdit(e)}>
                                                <CIcon icon={cilPencil} />
                                            </CButton>
                                            <CButton color='danger' onClick={() => dispatch(DeleteModerator(e?._id))}>
                                                <CIcon icon={cilDelete} />
                                            </CButton>
                                        </div>
                                    </div>
                                }
                                <CListGroup flush>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Բաժիններ</CCardText>
                                            <Checkbox checked={e?.accessToCategories} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToCategories: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Միջոցառումներ</CCardText>
                                            <Checkbox checked={e?.accessToEvents} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToEvents: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Սեանսներ</CCardText>
                                            <Checkbox checked={e?.accessToSessions} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToSessions: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Դահլիճներ</CCardText>
                                            <Checkbox checked={e?.accessToHalls} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToHalls: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Հովանավորներ</CCardText>
                                            <Checkbox checked={e?.accessToSponsors} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToSponsors: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Գովազդ</CCardText>
                                            <Checkbox checked={e?.accessToAds} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToAds: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Մոդերատորներ</CCardText>
                                            <Checkbox checked={e?.accessToModerators} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToModerators: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <div className='moderatorSettings'>
                                            <CCardText>Հետադարձ կապ</CCardText>
                                            <Checkbox checked={e?.accessToFeedback} onChange={(elm) => dispatch(ChangeModeratorSettings({ id: e?._id, accessToFeedback: elm?.target?.checked }))} />
                                        </div>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCardBody>
                        </CCard>
                    ))
                    : <h4 className='noEvents'>Մոդերատորներ չկան</h4>
                }
            </div>
        }
    </>)
}

export default AllModerators