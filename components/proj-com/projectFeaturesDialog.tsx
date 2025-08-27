"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ProjectFeaturesDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="!text-xs !font-thin !px-2 !py-0.5 rounded-xl shadow-md"
                >
                    Project Features 🚀
                </Button>

            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-primary">
                        Task Manager Pro - Professional Task Management
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[65vh] mt-4 pr-4">
                    <div className="space-y-4 text-sm leading-6 text-muted-foreground">
                        <h2 className="text-lg font-semibold">📋 About the Project</h2>
                        <p>
                            Task Manager Pro is a professional task management system built with the latest
                            React and Next.js technologies. It is designed to showcase advanced front-end
                            development skills and covers all modern web application requirements.
                        </p>

                        <h3 className="text-md font-semibold mt-4">🚀 Key Features</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>✅ Create, edit, and delete tasks with user confirmation</li>
                            <li>✅ Change task status (completed / pending)</li>
                            <li>✅ Drag and drop to reorder tasks</li>
                            <li>✅ Local storage for data persistence</li>
                            <li>✅ Professional modal for adding new tasks</li>
                            <li>✅ Form validation with Zod</li>
                        </ul>

                        <h3 className="text-md font-semibold mt-4">✨ Advanced Features</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>🔍 Search and filter tasks by status</li>
                            <li>♾️ Infinite scrolling with React Query</li>
                            <li>⌨️ Keyboard shortcuts (Cmd/Ctrl + K for search)</li>
                            <li>📊 Task progress stats and charts</li>
                            <li>📤 Export data to JSON/CSV</li>
                            <li>🌐 Offline support with connection status display</li>
                            <li>🎨 Smooth animations and interactive UI</li>
                        </ul>

                        <h3 className="text-md font-semibold mt-4">🏗️ Technical Architecture</h3>
                        <p>
                            Built using Next.js 15, TypeScript, Redux Toolkit, React Query, Tailwind CSS,
                            React Hook Form + Zod, Radix UI, and Lucide React for modern icons.
                        </p>

                        <h3 className="text-md font-semibold mt-4">🔮 Future Features</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Task sharing</li>
                            <li>Reminders and notifications</li>
                            <li>Multiple themes (Dark/Light)</li>
                            <li>PWA support</li>
                        </ul>

                        <p className="mt-6 font-medium text-primary">
                            Made with ❤️ by Saeed Yousefi (09196421264)
                        </p>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
