"use client"

import { TaskManager } from "../components/task-manager/task-manager"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useState } from "react"
import {ProjectFeaturesDialog} from "@/components/proj-com/projectFeaturesDialog";

export default function HomePage() {
  const [open, setOpen] = useState(false)

  return (
      <>

          <div className="flex items-center justify-between mt-6 mb-8 pr-4">
              {/* پروفایل سمت چپ */}
              <div className="flex items-center gap-2">
                  <Avatar className="w-20 h-20">
                      <AvatarImage src="/profile.jpg" alt="Saeed Yousefi"/>
                      <AvatarFallback>SY</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold">Saeed Yousefi</span>
                      <span className="text-sm text-muted-foreground">09196421264</span>
                  </div>
              </div>
              <ProjectFeaturesDialog/>
          </div>


          <TaskManager/>
      </>
  )
}
