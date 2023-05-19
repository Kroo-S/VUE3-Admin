// 这里是通用工具库


// 1. 封装消息提示
// element中的通知组件
import { ElNotification, ElMessageBox } from 'element-plus'

// 2. 引入nprogress全局loading
import nProgress from 'nprogress'


// 1. 封装的消息提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        // 弹窗持续时间
        duration: 3000
    })
}

export function showModal(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}

// 2. 显示全屏loading
export function showFullLoading(){
    nProgress.start()
}

// 2. 隐藏全屏loading
export function hideFullLoading(){
    nProgress.done()
}