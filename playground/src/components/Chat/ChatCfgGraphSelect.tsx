/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 
 * @Date: 2025-03-28 16:49:55
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2025-03-30 17:58:59
 */
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import {
  setSelectedGraphId,
} from "@/store/reducers/global"
import { useIsCompactLayout } from "@/common"
import { cn } from "@/lib/utils"


export function RemoteGraphSelect() {
    const dispatch = useAppDispatch()
    const graphName = useAppSelector((state) => state.global.selectedGraphId)
    const graphs = useAppSelector((state) => state.global.graphList)
    const agentConnected = useAppSelector((state) => state.global.agentConnected)
    
    const onGraphNameChange = (val: string) => {
      dispatch(setSelectedGraphId(val))
    }
  
    const graphOptions = graphs.map((item) => ({
      label: item,
      value: item,
    })).filter((item) => item.value == "voice_assistant");
  
    return (
      <>
        <Select
          value={graphName}
          onValueChange={onGraphNameChange}
          disabled={agentConnected}
        >
          <SelectTrigger
            className={cn(
              "w-auto", // or "w-auto max-w-full" if you want to keep the existing defaults
            )}
          >
          <SelectValue placeholder={"Select Graph"} />
          </SelectTrigger>
          <SelectContent>
            {graphOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    )
  }
  