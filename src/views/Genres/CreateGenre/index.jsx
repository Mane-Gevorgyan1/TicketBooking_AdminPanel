import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { CreateNewGenre } from 'src/services/action/genre_action'

const CreateGenre = () => {
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            dispatch(CreateNewGenre(name))
        }
        setValidated(true)
    }

    return (
        <div>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CCol md={4}>
                    <CFormInput
                        type="text"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        feedbackInvalid='Պարտադիր դաշտ'
                        placeholder='Անվանում'
                        label="Ժանր"
                        required
                    />
                </CCol>
                <CCol xs={12}>
                    <CButton color="primary" type="submit" disabled={!name.length}>
                        Ստեղծել
                    </CButton>
                </CCol>
            </CForm>
        </div>
    )
}

export default CreateGenre