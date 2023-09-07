import { ScrollView, RefreshControl } from 'react-native'
import { ReactNode, useState } from 'react'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'

type Props = {
    children: ReactNode
    style: any
    refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

export default function ScrollRefreshContainer({ children, refetch, style }: Props) {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
        if (!refetch) return
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }

    return (
        <ScrollView style={style}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh} />
            }>
            {children}
        </ScrollView>
    )
}