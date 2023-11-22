/**
 * 使用defer优化白屏时间，实现组件按重要程度逐帧渲染
 * 
 * 使用方式：
 * import { useDefer } from './useDefer;
 * const defer = useDefer();
 * 
 * <Comp1 v-if="defer(1)">
 * <Comp1 v-if="defer(2)">
 */

export function useDefer(maxCount = 100) {
    // 表示当前是第几帧
    const frameCount = ref(1)
    let rafId;
    function updateFrameCount() {
        /**
         * 浏览器在下次重绘之前调用指定的回调函数
         * 若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 requestAnimationFrame()。
         * requestAnimationFrame() 是一次性的。
         */
        rafId = requestAnimationFrame(() => {
            frameCount.value++;
            if (frameCount.value >= maxCount) {
                return;
            }
            updateFrameCount();
        })
    }
    updateFrameCount();
    onUnmounted(() => {
        cancelAnimationFrame(rafId);
    })
    return function(n) {
        return frameCount.value >= n;
    }
}

