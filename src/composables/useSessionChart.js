import { ref } from 'vue'
import { recordResult } from '@/plugins/store/sessionManager'

/**
 * Composable that tracks per-session skill-check results reactively,
 * forwarding each hit to the session manager at the same time.
 */
export function useSessionChart () {
  const sessionResults = ref([])

  function trackResult (result) {
    recordResult(result)
    sessionResults.value.push(result)
  }

  function resetResults () {
    sessionResults.value = []
  }

  return { sessionResults, trackResult, resetResults }
}
