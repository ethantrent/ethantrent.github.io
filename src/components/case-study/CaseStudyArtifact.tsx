"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import type { CaseSection } from "@/data/case-studies";
import { publicPath } from "@/lib/publicPath";
import { containDialogFocus, dismissOnBackdrop } from "@/lib/dialog";

type Artifact = NonNullable<CaseSection["artifacts"]>[number];

export function CaseStudyArtifact({ artifact }: { artifact: Artifact }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [originalSize, setOriginalSize] = useState(false);
  const [naturalSize, setNaturalSize] = useState({
    width: artifact.width ?? 960,
    height: artifact.height ?? 540,
  });
  const src = publicPath(artifact.src);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <figure className="mt-8">
      <a
        ref={trigger}
        href={src}
        aria-label={`View image: ${artifact.alt}`}
        aria-haspopup="dialog"
        aria-controls={id}
        className="project-visual block"
        onClick={(event) => {
          if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0 ||
            !dialog.current?.showModal
          )
            return;
          event.preventDefault();
          setOriginalSize(false);
          setIsOpen(true);
          dialog.current.showModal();
          closeButton.current?.focus();
        }}
      >
        <Image
          src={src}
          alt={artifact.alt}
          loading="eager"
          width={artifact.width ?? 960}
          height={artifact.height ?? 540}
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </a>
      <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {artifact.caption}{" "}
        <a className="underline underline-offset-4" href={src}>
          Open original image
        </a>
      </figcaption>
      <dialog
        ref={dialog}
        id={id}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
        onKeyDown={containDialogFocus}
        onClick={dismissOnBackdrop}
        onClose={() => {
          setIsOpen(false);
          setOriginalSize(false);
          trigger.current?.focus();
        }}
        className="editorial-dialog image-dialog fixed inset-0 m-auto h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1200px] p-4 md:p-6"
      >
        <div className="flex h-full min-h-0 flex-col gap-3">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <h2 id={`${id}-title`} className="text-lg font-medium">
              Image viewer
            </h2>
            <button
              ref={closeButton}
              type="button"
              onClick={() => dialog.current?.close()}
              className="flex h-11 w-11 shrink-0 items-center justify-center"
              aria-label="Close image viewer"
            >
              <X size={22} aria-hidden />
            </button>
          </div>
          <button
            type="button"
            className="text-link shrink-0 self-start"
            onClick={() => {
              setOriginalSize(!originalSize);
              viewport.current?.scrollTo(0, 0);
            }}
          >
            {originalSize ? "Fit image" : "Original size"}
          </button>
          <div
            ref={viewport}
            role="region"
            aria-label="Image detail"
            tabIndex={0}
            className="min-h-[min(30dvh,12rem)] flex-1 overflow-auto overscroll-contain bg-surface"
          >
            {isOpen && (
              <Image
                src={src}
                alt={artifact.alt}
                width={artifact.width ?? 960}
                height={artifact.height ?? 540}
                loading="eager"
                className="block max-w-none object-contain"
                style={{
                  width: originalSize ? naturalSize.width : "100%",
                  height: originalSize ? naturalSize.height : "100%",
                }}
                onLoad={(event) =>
                  setNaturalSize({
                    width: event.currentTarget.naturalWidth,
                    height: event.currentTarget.naturalHeight,
                  })
                }
              />
            )}
          </div>
          <div className="shrink-0 text-sm leading-relaxed text-muted">
            <p id={`${id}-caption`}>{artifact.caption}</p>
            <a className="text-link" href={src}>
              Open original image
            </a>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
