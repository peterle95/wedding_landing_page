export interface Device {
    name: string;
    width: number;
    height: number;
    isMobile: boolean;
    userAgent?: string;
}

// User Agent strings are approximated for simulation purposes
export const devices: Device[] = [
    // iOS Devices
    {
        name: 'iPhone SE (2nd gen)',
        width: 375,
        height: 667,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    },
    {
        name: 'iPhone 12 Pro',
        width: 390,
        height: 844,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
    },
    {
        name: 'iPhone 14 Pro Max',
        width: 430,
        height: 932,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    },
    {
        name: 'iPad Mini',
        width: 768,
        height: 1024,
        isMobile: true, // Treated as mobile-like for touch events usually
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1'
    },
    {
        name: 'iPad Air',
        width: 820,
        height: 1180,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15' // iPad often requests desktop site by default now, but we can stick to mobile UA if we want to force mobile view
    },
    {
        name: 'iPad Pro 12.9',
        width: 1024,
        height: 1366,
        isMobile: false
    },

    // Android Devices
    {
        name: 'Google Pixel 5',
        width: 393,
        height: 851,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'
    },
    {
        name: 'Google Pixel 7',
        width: 412,
        height: 915,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
    },
    {
        name: 'Samsung Galaxy S22',
        width: 360,
        height: 780,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Mobile Safari/537.36'
    },
    {
        name: 'Samsung Galaxy S23 Ultra',
        width: 412,
        height: 915, // Approx viewport
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36'
    },
    {
        name: 'Samsung Galaxy Z Fold 4 (Cover)',
        width: 374, // Narrow cover screen
        height: 896, // Height varies
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-F936B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Mobile Safari/537.36'
    },
    {
        name: 'Samsung Galaxy Z Fold 4 (Unfolded)',
        width: 884, // Approx unfolded
        height: 1104,
        isMobile: true,
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-F936B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Mobile Safari/537.36'
    },

    // Desktop
    {
        name: 'MacBook Pro 13',
        width: 1280,
        height: 800,
        isMobile: false
    },
    {
        name: 'MacBook Pro 16',
        width: 1536,
        height: 960,
        isMobile: false
    },
    {
        name: '1080p Desktop',
        width: 1920,
        height: 1080,
        isMobile: false
    },
    {
        name: '4K Desktop',
        width: 3840,
        height: 2160,
        isMobile: false
    }
];
