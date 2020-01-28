/* eslint-disable @typescript-eslint/no-explicit-any */
//use this function to track custom events eg. track('Link to API docs clicked')
export function track(event: any) {
  const Window: any = window
  if (Window && Window !== undefined && Window.analytics !== undefined) {
    Window && Window.analytics && Window.analytics.track && Window.analytics.track(event)
  }
}
