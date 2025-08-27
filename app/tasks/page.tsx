"use client";

import { useEffect } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { AddTaskModal } from "../../components/task-manager/add-task-modal";
import { TaskFilters } from "../../components/task-manager/task-filters";
import { TaskList } from "../../components/task-manager/task-list";
import { TaskStats } from "../../components/task-manager/task-stats";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ui/theme-toggle";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { setTodos } from "../../lib/store/slices/todoSlice";
import { useTodos } from "../../lib/hooks/useTodos";
import { useKeyboardShortcuts } from "../../lib/hooks/useKeyboardShortcuts";
import { localStorageUtils } from "../../lib/utils/localStorage";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const { isLoading, error, refetch } = useTodos();

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Save to localStorage whenever todos change (including reordering)
  useEffect(() => {
    if (todos.length > 0) {
      localStorageUtils.saveTodos(todos);
    }
  }, [todos]);

  // Load from localStorage on mount if API fails
  useEffect(() => {
    if (error && todos.length === 0) {
      const savedTodos = localStorageUtils.loadTodos();
      if (savedTodos.length > 0) {
        dispatch(setTodos(savedTodos));
      }
    }
  }, [error, todos.length, dispatch]);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mt-6 mb-8 pr-4">
          {/* پروفایل سمت چپ */}
          <div className="flex items-center gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/profile.jpg" alt="Saeed Yousefi" />
              <AvatarFallback>SY</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold">Saeed Yousefi</span>
              <span className="text-sm text-muted-foreground">09196421264</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8 mt-6 animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-1xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Task Manager Pro
              </h1>

              <div className="flex items-center gap-2">
                {error ? (
                  <div className="flex items-center gap-1 text-destructive text-sm animate-pulse">
                    <WifiOff className="h-4 w-4" />
                    <span>Offline</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <Wifi className="h-4 w-4" />
                    <span>Online</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200"
                >
                  <RefreshCw
                    className={`h-4 w-4 transition-transform duration-500 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>

            <ThemeToggle />
          </div>

          <p className="text-muted-foreground text-lg">
            Organize your tasks efficiently with drag & drop, search, and
            filters
          </p>

          {error && (
            <div className="mt-2 text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
              Working offline - changes will sync when connection is restored
            </div>
          )}
        </div>

        {/* Task Statistics */}
        <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
          <TaskStats />
        </div>

        <div className="mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
          <AddTaskModal />
        </div>

        {/* Filters */}
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-300">
          <TaskFilters />
        </div>

        {/* Task List */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
