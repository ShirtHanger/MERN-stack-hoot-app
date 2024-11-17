/* Allows axios call for a hoot's data */

import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react'
import * as hootService from '../../services/hootService'

const HootDetails = (props) => {

    const [hoot, setHoot] = useState(null)

    const { hootId } = useParams()

    useEffect(() => {
        async function getHoot() {

          const hootData = await hootService.showHoot(hootId)
          setHoot(hootData)
        }
        getHoot()
      }, [hootId]) // This will fire off when the hood ID changes
      
      // Verify that hoot state is being set correctly:
      console.log('hoot state:', hoot)

    

    if (!hoot) return <main>Loading...</main>

    
    return (

        /* Main hoot post */
        
        <main>
        <header>
            <p>{hoot.category.toUpperCase()}</p>
            <h1>{hoot.title}</h1>
            <p>
            @{hoot.author.username} posted on {new Date(hoot.createdAt).toLocaleDateString()}
            </p>
        </header>
        <p>{hoot.text}</p>

        {/* Hoot comments section */}
        <section>
            <h2>Comments</h2>

            {!hoot.comments.length && <p>There are no comments.</p>}

            {hoot.comments.map((comment) => (
            <article key={comment._id}>
                <header>
                <p>
                    {comment.author.username} posted on
                    {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                </header>
                <p>{comment.text}</p>
            </article>
            ))}

        </section>
        </main>
    )

  }
  
  export default HootDetails
  