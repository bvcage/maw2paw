import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function VisitSummary (props) {
   const { user, visit: passed, onEndVisit } = props
   const params = useParams()

   const [edit, setEdit] = useState(false)
   const [visit, setVisit] = useState({})

   const navigate = useNavigate()

   useEffect(() => {
      fetch(`/visits/${params.id}`).then(r=>r.json()).then(visit=>{
         if (visit.diagnosis === null) visit.diagnosis = ""
         if (visit.note === null) visit.note = ""
         setVisit(visit)
      })
   }, [params.id])

   function endVisit (e) {
      const end = {...visit,
         location: 1,
         status: 5,
         completed_by: user.id
      }
      setVisit(end)
      handleSubmit(e)
      onEndVisit(end)
      navigate('/main/visits')
   }

   function handleChange (e) {
      setVisit({...visit,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit (e) {
      e.preventDefault()
      setEdit(false)
      const patch = makePatch()
      fetch(`/visits/${visit.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(patch)
      }).then(r=>{
         if (r.ok) r.json().then(setVisit)
         else console.log('error')
      })
   }

   function makePatch () {
      const patch = {...visit,
         location: 1,
         status: 5,
         completed_by: user.id,
         pet_id: visit.pet.id,
         vet_id: visit.vet.id
      }
      delete patch["pet"]
      delete patch["vet"]
      delete patch["owners"]
      delete patch["departed_at"]
      return patch
   }

   const editBtn = <button type="button" onClick={() => parseInt(user.id) === visit.completed_by ? setEdit(true) : setEdit(false) }>edit</button>
   const saveBtn = <button type="submit">save</button>

   if (!visit ||
      !visit.pet ||
      !visit.vet) return (<div>no visit to display</div>)
   
   return (
      <div>
         <h2>visit summary</h2>
         <h3>visit #{visit.id}</h3>
         <p>for: {visit.pet.name}</p>
         <p>seen by: Dr. {visit.vet.last_name}</p>

         <form onSubmit={handleSubmit}>

            <div className="form-floating">
               <input
                  name="diagnosis"
                  type="text"
                  className="form-control"
                  disabled={!edit}
                  placeholder="diagnosis"
                  value={visit.diagnosis}
                  onChange={handleChange}
               />
               <label>diagnosis</label>
            </div>

            {edit ? saveBtn : null }

         </form>

         {edit ? null : editBtn }

         <button type="button" onClick={endVisit}>conclude visit</button>

      </div>
   )
}

export default VisitSummary