"use client";

import { useActionState, useTransition, useState } from "react";
import { updatePost, deletePost, ActionState } from "@/app/file-actions";
import { Button } from "../ui/button";
import  Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";







// ─── Types ────────────────────────────────────────────────────────────────────

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  userId : string
};

type PostEditorProps = {
  post: Post;
};

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: ActionState = { success: false, message: "" };

// ─── Delete Button ────────────────────────────────────────────────────────────

function DeletePostButton({ id }: {id: string }) {
  const deletePostWithId = deletePost.bind(null, id);
  const [state, formAction] = useActionState(deletePostWithId, initialState);
  const [confirming, setConfirming] = useState(false);

  const {data : session}  = useSession()





  return (
    <div className="delete-wrapper">
      {!confirming ? 

        (session?.user as{role:string} |undefined)?.role==="USER" &&

        <Button
          type="button"
          className="btn btn-danger"
          onClick={() => setConfirming(true)}
        >
          <span className="btn-icon">✕</span> Delete Post
          
          </Button>
        
      : (
        <div className="confirm-row">
          <span className="confirm-label">Are you sure?</span>
          <form action={formAction} style={{ display: "inline" }}>
          
           <Button onClick= {()=>setConfirming(true)}>yes, delete</Button>         
            
          </form>
          <Button
            type="button"
            className="btn btn-ghost"
            onClick={() => setConfirming(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      {state.message && !state.success && (
        <p className="field-error" role="alert">{state.message}</p>
      )}
    </div>
  );
}

// ─── Post Editor ──────────────────────────────────────────────────────────────

export default function PostEditor({post} : PostEditorProps) {



  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);
  const [isPending, startTransition] = useTransition();

  const [updateMode, setUpdateMode]  = useState(false)



  const {data: session }  = useSession()  




  return (
    
      

      <div className=" flex mt-8 mx-0">
        {/* Header */}
        
        {/* Global success / error banner */}
        {state.message && (
          <div
            className={`banner ${state.success ? "banner-success" : "banner-error"}`}
            role="alert"
          >
            <span className="banner-icon">{state.success ? "✓" : "⚠"}</span>
            {state.message}
          </div>
        )}

        {/* Update form */}

        <div className="">

        {updateMode?

        <form
          action={formAction}
          className="editor-form"
          onSubmit={(e) => {
            startTransition(() => {});
          }}
        >
          {/* Title */}

          
          
          <div className=" flex flex-col w-[600px] ">
            <label className="field-label font-bold" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`field-input ${state.errors?.title ? "field-input--error" : ""}`}
              defaultValue={post.title}
              placeholder="Your post title…"
              autoComplete="off"
            />
            {state.errors?.title && (
              <p className="field-error" role="alert">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="field flex flex-col">

          <label className="field-label font-bold" htmlFor="content">
              Content
            </label>
            
            <textarea
              id="content"
              name="content"
              className={`field-textarea ${state.errors?.content ? "field-input--error" : ""}`}
              defaultValue={post.content}
              placeholder="Write something…"
              rows={10}
            />
            {state.errors?.content && (
              <p className="field-error" role="alert">
                {state.errors.content[0]}
              </p>
            )}

            <button
              type="submit"
              className="absolute right-75 mt-6 "
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Saving…
                </>
              ) : (

                
                <>
                  <span className="">✓</span>
                  Save Changes
                </>
              )}
            </button>
          

            
          </div>

          
          </form>

          :

          <>
          <div className="flex">

          <p className="flex gap-2">

            {(session?.user as { role?: string } | undefined)?.role === "USER" &&


           <Button onClick= {()=>setUpdateMode(true)}>Update Post</Button>         
          
          
          
          
          }

            

          </p>

          <div className="flex">


            <div className="editor-actions flex">

            <DeletePostButton id={post.id} />

            
            
          </div>

          </div>

          </div>

          </>


        }



          </div>

          {/* Published toggle */}
          {/* <div className="field field--row">
            <label className="toggle-label" htmlFor="published">
              <span>Publish post</span>
              <span className="toggle-hint">
                {post.published ? "Currently live" : "Currently a draft"}
              </span>
            </label>
            <div className="toggle-switch">
              <input
                id="published"
                name="published"
                type="checkbox"
                className="toggle-input"
                defaultChecked={post.published}
                value="true"
              />
              <span className="toggle-track" />
            </div>
          </div> */}

          {/* Actions */}
          
        
      </div>
    
  );
}