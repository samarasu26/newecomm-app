"use client";

import { useActionState, useTransition, useState } from "react";
import { updatePost, deletePost, ActionState } from "@/app/file-actions";
import { Button } from "../ui/button";
import  Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";







// ─── Types ────────────────────────────────────────────────────────────────────

// type Document = {
//   id: string;
//   name: string;
  
//   published: boolean;
// };

// type  DocumentEditorProps = {
//   document: Document;
// };

// // ─── Initial state ────────────────────────────────────────────────────────────

// const initialState: ActionState = { success: false, message: "" };

// // ─── Delete Button ────────────────────────────────────────────────────────────

// function DeleteDocButton({ id }: {id: string }) {
//   const deleteDocumentWithId = deleteDocument.bind(null, id);
//   const [state, fileActionForm] = useActionState(deleteDocumentWithId, initialState);
//   const [confirming, setConfirming] = useState(false);

//   const {data : session}  = useSession()





//   return (
//     <div className="delete-wrapper">
//       {!confirming ? 

//         (session?.user as{role:string} |undefined)?.role==="ADMIN" &&

//         <Button
//           type="button"
//           className="btn btn-danger"
//           onClick={() => setConfirming(true)}
//         >
//           <span className="btn-icon">✕</span> Delete Document
          
//           </Button>
        
//       : (
//         <div className="confirm-row">
//           <span className="confirm-label">Are you sure?</span>
//           <form action={fileActionForm} style={{ display: "inline" }}>
          
//            <Button onClick= {()=>setConfirming(true)}>yes, delete</Button>         
            
//           </form>
//           <Button
//             type="button"
//             className="btn btn-ghost"
//             onClick={() => setConfirming(false)}
//           >
//             Cancel
//           </Button>
//         </div>
//       )}
//       {state.message && !state.success && (
//         <p className="field-error" role="alert">{state.message}</p>
//       )}
//     </div>
//   );
// }

// // ─── Post Editor ──────────────────────────────────────────────────────────────

// export default function DocumentEditor({document} : DocumentEditorProps) {



//   const updateDocumentWithId = updateDocument.bind(null, document.id);
//   const [state, fileActionForm] = useActionState(updateDocumentWithId, initialState);
//   const [isPending, startTransition] = useTransition();

//   const [updateMode, setUpdateMode]  = useState(false)



//   const {data: session }  = useSession()  




//   return (
    
      

//       <div className=" flex mt-8 mx-0">
//         {/* Header */}
        
//         {/* Global success / error banner */}
//         {state.message && (
//           <div
//             className={`banner ${state.success ? "banner-success" : "banner-error"}`}
//             role="alert"
//           >
//             <span className="banner-icon">{state.success ? "✓" : "⚠"}</span>
//             {state.message}
//           </div>
//         )}

//         {/* Update form */}

//         <div className="">

//         {updateMode?

//         <form
//           action={fileActionForm}
//           className="editor-form"
//           onSubmit={(e) => {
//             startTransition(() => {});
//           }}
//         >
//           {/* Title */}

          
          
//           <div className=" flex flex-col w-[600px] ">
//             <label className="field-label font-bold" htmlFor="title">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               className={`field-input ${state.errors?.name ? "field-input--error" : ""}`}
//               defaultValue={document.name}
//               placeholder="Your post title…"
//               autoComplete="off"
//             />
//             {state.errors?.name && (
//               <p className="field-error" role="alert">
//                 {state.errors.name[0]}
//               </p>
//             )}
//           </div>

//           {/* Content */}
//           <div className="field flex flex-col">

          
            
            
//             {state.errors?.content && (
//               <p className="field-error" role="alert">
//                 {state.errors.name[0]}
//               </p>
//             )}

//             <button
//               type="submit"
//               className="absolute right-75 mt-6 "
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <>
//                   <span className="spinner" aria-hidden="true" />
//                   Saving…
//                 </>
//               ) : (

                
//                 <>
//                   <span className="">✓</span>
//                   Save Changes
//                 </>
//               )}
//             </button>
          

            
//           </div>

          
//           </form>

//           :

//           <>
//           <div className="flex">

//           <p className="flex gap-2">

//             {(session?.user as { role?: string } | undefined)?.role === "ADMIN" &&


//            <Button onClick= {()=>setUpdateMode(true)}>Update Post</Button>         
          
          
          
          
//           }

            

//           </p>

//           <div className="flex">


//             <div className="editor-actions flex">

//             <DeleteDocButton id={document.id} />

            
            
//           </div>

//           </div>

//           </div>

//           </>


//         }



//           </div>

//           {/* Published toggle */}
//           {/* <div className="field field--row">
//             <label className="toggle-label" htmlFor="published">
//               <span>Publish post</span>
//               <span className="toggle-hint">
//                 {post.published ? "Currently live" : "Currently a draft"}
//               </span>
//             </label>
//             <div className="toggle-switch">
//               <input
//                 id="published"
//                 name="published"
//                 type="checkbox"
//                 className="toggle-input"
//                 defaultChecked={post.published}
//                 value="true"
//               />
//               <span className="toggle-track" />
//             </div>
//           </div> */}

//           {/* Actions */}
          
        
//       </div>
    
//   );
// }