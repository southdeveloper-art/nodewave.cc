// ==========================================================================
// NodeWave Interactive Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initPricingCalculator();
    initLiveStatsSimulator();
    initPingTester();
    initCodeConfigurator();
    initFAQAccordion();
    initAudioTester();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const drawer = document.getElementById('mobile-menu-drawer');
    const links = document.querySelectorAll('.mobile-menu-link');

    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        drawer.classList.toggle('active');
        // Simple animation logic for the toggle button span bars
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            drawer.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

/* --------------------------------------------------------------------------
   2. Interactive Pricing Calculator
   -------------------------------------------------------------------------- */
function initPricingCalculator() {
    const resourceData = {
        bot: {
            serviceName: "Discord Bot Hosting",
            tickLabels: ["512M", "1GB", "2GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
            steps: {
                1: { ram: "512 MB RAM", cpu: "50% Core AMD Ryzen", disk: "2 GB NVMe Storage", db: "1 Database Slot", traffic: "Unmetered 10Gbps", price: "52" },
                2: { ram: "1 GB RAM", cpu: "100% Core AMD Ryzen", disk: "6 GB NVMe Storage", db: "1 Database Slot", traffic: "Unmetered 10Gbps", price: "130" },
                3: { ram: "2 GB RAM", cpu: "200% Core AMD Ryzen", disk: "8 GB NVMe Storage", db: "2 Database Slots", traffic: "Unmetered 10Gbps", price: "200" },
                4: { ram: "4 GB RAM", cpu: "150% Core AMD Ryzen", disk: "12 GB NVMe Storage", db: "2 Database Slots", traffic: "Unmetered 10Gbps", price: "260" },
                5: { ram: "6 GB RAM", cpu: "300% Core AMD Ryzen", disk: "15 GB NVMe Storage", db: "3 Database Slots", traffic: "Unmetered 10Gbps", price: "360" },
                6: { ram: "8 GB RAM", cpu: "400% Core AMD Ryzen", disk: "18 GB NVMe Storage", db: "3 Database Slots", traffic: "Unmetered 10Gbps", price: "455" },
                7: { ram: "12 GB RAM", cpu: "500% Core AMD Ryzen", disk: "25 GB NVMe Storage", db: "4 Database Slots", traffic: "Unmetered 10Gbps", price: "680" },
                8: { ram: "16 GB RAM", cpu: "600% Core AMD Ryzen", disk: "35 GB NVMe Storage", db: "5 Database Slots", traffic: "Unmetered 10Gbps", price: "999" }
            }
        },
        lavalink: {
            serviceName: "Lavalink Audio Nodes",
            tickLabels: ["1GB", "2GB", "3GB", "4GB", "5GB", "6GB", "8GB", "12GB"],
            steps: {
                1: { ram: "1 GB RAM", cpu: "50% Core Shared CPU", disk: "2 GB NVMe Storage", db: "Config Node", traffic: "1 Gbps Premium Uplink", price: "150" },
                2: { ram: "2 GB RAM (Basic)", cpu: "1 Dedicated Core Xeon", disk: "5 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "350" },
                3: { ram: "3 GB RAM", cpu: "1.5 Dedicated Cores", disk: "6 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "400" },
                4: { ram: "4 GB RAM (Starter)", cpu: "2 Dedicated Cores Xeon", disk: "8 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "450" },
                5: { ram: "5 GB RAM", cpu: "4 Dedicated Cores EPYC", disk: "10 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "550" },
                6: { ram: "6 GB RAM (Gold)", cpu: "6 Dedicated Cores EPYC", disk: "15 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "650" },
                7: { ram: "8 GB RAM (Platinum)", cpu: "8 Dedicated Cores EPYC", disk: "20 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "850" },
                8: { ram: "12 GB RAM (Supreme)", cpu: "10 Dedicated Cores EPYC", disk: "30 GB NVMe Storage", db: "JVM Tuned", traffic: "10 Gbps DDoS Protected", price: "1200" }
            }
        }
    };

    let currentTab = 'bot';

    const tabBotBtn = document.getElementById('tab-bot');
    const tabLavalinkBtn = document.getElementById('tab-lavalink');
    const slider = document.getElementById('resource-slider');
    const serviceTypeDisplay = document.getElementById('current-service-type');
    const ramDisplay = document.getElementById('ram-display');
    const cpuDisplay = document.getElementById('cpu-display');
    const diskDisplay = document.getElementById('disk-display');
    const dbDisplay = document.getElementById('db-display');
    const trafficDisplay = document.getElementById('traffic-display');
    const priceDisplay = document.getElementById('price-display');
    const ticksContainer = document.querySelector('.slider-ticks');

    if (!slider) return;

    function updateCalculator() {
        const step = slider.value;
        const currentData = resourceData[currentTab].steps[step];

        // Update Text Info
        serviceTypeDisplay.textContent = resourceData[currentTab].serviceName;
        ramDisplay.textContent = currentData.ram;
        cpuDisplay.textContent = currentData.cpu;
        diskDisplay.textContent = currentData.disk;
        dbDisplay.textContent = currentData.db;
        trafficDisplay.textContent = currentData.traffic;
        priceDisplay.textContent = currentData.price;

        // Custom styling for range fill tracking in modern browsers
        const min = slider.min ? slider.min : 1;
        const max = slider.max ? slider.max : 8;
        const percentage = ((step - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--accent-cyan) 0%, var(--accent-cyan) ${percentage}%, #1f2937 ${percentage}%, #1f2937 100%)`;
    }

    function switchTab(tab) {
        currentTab = tab;
        if (tab === 'bot') {
            tabBotBtn.classList.add('active');
            tabLavalinkBtn.classList.remove('active');
            slider.max = 8;
        } else {
            tabLavalinkBtn.classList.add('active');
            tabBotBtn.classList.remove('active');
            slider.max = 8;
        }
        
        // Render corresponding Tick labels
        const ticks = resourceData[currentTab].tickLabels;
        ticksContainer.innerHTML = ticks.map(t => `<span>${t}</span>`).join('');

        updateCalculator();
    }

    tabBotBtn.addEventListener('click', () => switchTab('bot'));
    tabLavalinkBtn.addEventListener('click', () => switchTab('lavalink'));
    slider.addEventListener('input', updateCalculator);

    // Initial setup run
    switchTab('bot');
}

/* --------------------------------------------------------------------------
   3. Live Status Stats Simulator
   -------------------------------------------------------------------------- */
function initLiveStatsSimulator() {
    const activePlayersCountEl = document.getElementById('active-players-count');
    const netLoadValEl = document.getElementById('net-load-val');
    const netLoadBarEl = document.getElementById('net-load-bar');

    if (!activePlayersCountEl) return;

    let basePlayers = 4280;
    let baseNetworkLoad = 42;

    setInterval(() => {
        // Randomly adjust player counts slightly
        const deltaPlayers = Math.floor(Math.random() * 25) - 12;
        basePlayers = Math.max(3000, basePlayers + deltaPlayers);
        activePlayersCountEl.textContent = basePlayers.toLocaleString() + " players";

        // Randomly adjust network load distribution
        const deltaLoad = Math.floor(Math.random() * 7) - 3;
        baseNetworkLoad = Math.max(20, Math.min(95, baseNetworkLoad + deltaLoad));
        
        netLoadValEl.textContent = baseNetworkLoad + "% Traffic";
        netLoadBarEl.style.width = baseNetworkLoad + "%";
    }, 4000);
}

/* --------------------------------------------------------------------------
   4. Latency Tester
   -------------------------------------------------------------------------- */
function initPingTester() {
    const testBtn = document.getElementById('btn-run-ping-test');
    const pingUs = document.getElementById('ping-us');
    const pingGermany = document.getElementById('ping-germany');
    const pingSingapore = document.getElementById('ping-singapore');

    if (!testBtn) return;

    testBtn.addEventListener('click', () => {
        // Disable button while ping simulation runs
        testBtn.disabled = true;
        testBtn.innerHTML = `
            <svg class="animate-pulse" style="animation: spin 1s linear infinite" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            Testing Connection Latency...
        `;

        // Reset display pings
        const pings = [pingUs, pingGermany, pingSingapore];
        pings.forEach(p => {
            p.textContent = "testing...";
            p.className = "ping-result loading";
        });

        // Simulating sequence timing
        setTimeout(() => {
            // US Node Simulation
            const usLatency = Math.floor(Math.random() * 12) + 10; // 10-22ms
            pingUs.textContent = `${usLatency} ms`;
            pingUs.className = "ping-result fast";
        }, 800);

        setTimeout(() => {
            // Germany Node Simulation
            const euLatency = Math.floor(Math.random() * 15) + 15; // 15-30ms
            pingGermany.textContent = `${euLatency} ms`;
            pingGermany.className = "ping-result fast";
        }, 1400);

        setTimeout(() => {
            // Singapore Node Simulation
            const sgLatency = Math.floor(Math.random() * 12) + 18; // 18-30ms
            pingSingapore.textContent = `${sgLatency} ms`;
            pingSingapore.className = "ping-result fast";

            // Re-enable tester button
            testBtn.disabled = false;
            testBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Run Real-time Ping Test
            `;
        }, 2000);
    });
}

// Add CSS keyframes dynamically for loader spinning
const styleEl = document.createElement('style');
styleEl.innerHTML = `
    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleEl);

/* --------------------------------------------------------------------------
   5. Interactive Code Configurator & Snippet Manager
   -------------------------------------------------------------------------- */
function initCodeConfigurator() {
    const rawSnippets = {
        'js-poru': {
            fileName: 'bot.js',
            codeRaw: `const { Client, GatewayIntentBits } = require("discord.js");
const { Poru } = require("poru");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Configure NodeWave Lavalink Node
const nodes = [{
    name: "NodeWave-DE",
    host: "de.nodewave.cc",
    port: 2333,
    password: "YOUR_NODEWAVE_SECURE_PASSWORD",
    secure: false // Set true if using SSL
}];

client.poru = new Poru(client, nodes, {
    library: "discord.js",
    defaultPlatform: "ytsearch"
});

client.poru.on("nodeConnect", (node) => {
    console.log(\`NodeWave node "\${node.name}" is connected successfully.\`);
});

client.on("ready", () => {
    console.log(\`Logged in as \${client.user.tag}\`);
    client.poru.init(client);
});

client.login("YOUR_DISCORD_BOT_TOKEN");`,
            codeHTML: `<span class="syntax-keyword">const</span> { Client, GatewayIntentBits } = <span class="syntax-func">require</span>(<span class="syntax-string">"discord.js"</span>);
<span class="syntax-keyword">const</span> { Poru } = <span class="syntax-func">require</span>(<span class="syntax-string">"poru"</span>);

<span class="syntax-keyword">const</span> client = <span class="syntax-keyword">new</span> <span class="syntax-func">Client</span>({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

<span class="syntax-comment">// Configure NodeWave Lavalink Node</span>
<span class="syntax-keyword">const</span> nodes = [{
    name: <span class="syntax-string">"NodeWave-DE"</span>,
    host: <span class="syntax-string">"de.nodewave.cc"</span>,
    port: <span class="syntax-number">2333</span>,
    password: <span class="syntax-string">"YOUR_NODEWAVE_SECURE_PASSWORD"</span>,
    secure: <span class="syntax-keyword">false</span> <span class="syntax-comment">// Set true if using SSL</span>
}];

client.poru = <span class="syntax-keyword">new</span> <span class="syntax-func">Poru</span>(client, nodes, {
    library: <span class="syntax-string">"discord.js"</span>,
    defaultPlatform: <span class="syntax-string">"ytsearch"</span>
});

client.poru.<span class="syntax-func">on</span>(<span class="syntax-string">"nodeConnect"</span>, (node) => {
    console.<span class="syntax-func">log</span>(\`NodeWave node "\${node.name}" is connected successfully.\`);
});

client.<span class="syntax-func">on</span>(<span class="syntax-string">"ready"</span>, () => {
    console.<span class="syntax-func">log</span>(\`Logged in as \${client.user.tag}\`);
    client.poru.<span class="syntax-func">init</span>(client);
});

client.<span class="syntax-func">login</span>(<span class="syntax-string">"YOUR_DISCORD_BOT_TOKEN"</span>);`
        },
        'js-erela': {
            fileName: 'index.js',
            codeRaw: `const { Client, GatewayIntentBits } = require("discord.js");
const { Manager } = require("erela.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

// Setup Erela.js NodeManager
client.manager = new Manager({
    nodes: [
        {
            host: "us.nodewave.cc",
            port: 2333,
            password: "YOUR_NODEWAVE_SECURE_PASSWORD",
            secure: false
        }
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

client.manager.on("nodeConnect", node => console.log(\`Node \${node.options.host} connected.\`));

client.once("ready", () => {
    console.log(\`Logged in as \${client.user.tag}\`);
    client.manager.init(client.user.id);
});

client.on("raw", d => client.manager.updateVoiceState(d));
client.login("YOUR_DISCORD_BOT_TOKEN");`,
            codeHTML: `<span class="syntax-keyword">const</span> { Client, GatewayIntentBits } = <span class="syntax-func">require</span>(<span class="syntax-string">"discord.js"</span>);
<span class="syntax-keyword">const</span> { Manager } = <span class="syntax-func">require</span>(<span class="syntax-string">"erela.js"</span>);

<span class="syntax-keyword">const</span> client = <span class="syntax-keyword">new</span> <span class="syntax-func">Client</span>({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

<span class="syntax-comment">// Setup Erela.js NodeManager</span>
client.manager = <span class="syntax-keyword">new</span> <span class="syntax-func">Manager</span>({
    nodes: [
        {
            host: <span class="syntax-string">"us.nodewave.cc"</span>,
            port: <span class="syntax-number">2333</span>,
            password: <span class="syntax-string">"YOUR_NODEWAVE_SECURE_PASSWORD"</span>,
            secure: <span class="syntax-keyword">false</span>
        }
    ],
    <span class="syntax-func">send</span>(id, payload) {
        <span class="syntax-keyword">const</span> guild = client.guilds.cache.get(id);
        <span class="syntax-keyword">if</span> (guild) guild.shard.send(payload);
    }
});

client.manager.<span class="syntax-func">on</span>(<span class="syntax-string">"nodeConnect"</span>, node => console.<span class="syntax-func">log</span>(\`Node \${node.options.host} connected.\`));

client.<span class="syntax-func">once</span>(<span class="syntax-string">"ready"</span>, () => {
    console.<span class="syntax-func">log</span>(\`Logged in as \${client.user.tag}\`);
    client.manager.<span class="syntax-func">init</span>(client.user.id);
});

client.<span class="syntax-func">on</span>(<span class="syntax-string">"raw"</span>, d => client.manager.<span class="syntax-func">updateVoiceState</span>(d));
client.<span class="syntax-func">login</span>(<span class="syntax-string">"YOUR_DISCORD_BOT_TOKEN"</span>);`
        },
        'py-wavelink': {
            fileName: 'bot.py',
            codeRaw: `import discord
from discord.ext import commands
import wavelink

class MusicBot(commands.Bot):
    def __init__(self) -> None:
        intents = discord.Intents.default()
        intents.message_content = True
        super().__init__(command_prefix="?", intents=intents)

    async def setup_hook(self) -> None:
        # Connect to NodeWave Lavalink Node
        nodes = [wavelink.Node(
            uri="http://us.nodewave.cc:2333",
            password="YOUR_NODEWAVE_SECURE_PASSWORD"
        )]
        await wavelink.Pool.connect(nodes=nodes, client=self)

    async def on_ready(self) -> None:
        print(f"Logged in as {self.user.name}")

bot = MusicBot()

@bot.event
async def on_wavelink_node_ready(payload: wavelink.NodeReadyEventPayload) -> None:
    print(f"NodeWave Node successfully connected: {payload.node.identifier}")

bot.run("YOUR_DISCORD_BOT_TOKEN")`,
            codeHTML: `<span class="syntax-keyword">import</span> discord
<span class="syntax-keyword">from</span> discord.ext <span class="syntax-keyword">import</span> commands
<span class="syntax-keyword">import</span> wavelink

<span class="syntax-keyword">class</span> <span class="syntax-func">MusicBot</span>(commands.Bot):
    <span class="syntax-keyword">def</span> <span class="syntax-func">__init__</span>(self) -> <span class="syntax-keyword">None</span>:
        intents = discord.Intents.default()
        intents.message_content = <span class="syntax-keyword">True</span>
        <span class="syntax-keyword">super</span>().<span class="syntax-func">__init__</span>(command_prefix=<span class="syntax-string">"?"</span>, intents=intents)

    <span class="syntax-keyword">async def</span> <span class="syntax-func">setup_hook</span>(self) -> <span class="syntax-keyword">None</span>:
        <span class="syntax-comment"># Connect to NodeWave Lavalink Node</span>
        nodes = [wavelink.<span class="syntax-func">Node</span>(
            uri=<span class="syntax-string">"http://us.nodewave.cc:2333"</span>,
            password=<span class="syntax-string">"YOUR_NODEWAVE_SECURE_PASSWORD"</span>
        )]
        <span class="syntax-keyword">await</span> wavelink.Pool.<span class="syntax-func">connect</span>(nodes=nodes, client=self)

    <span class="syntax-keyword">async def</span> <span class="syntax-func">on_ready</span>(self) -> <span class="syntax-keyword">None</span>:
        <span class="syntax-func">print</span>(f<span class="syntax-string">"Logged in as {self.user.name}"</span>)

bot = <span class="syntax-func">MusicBot</span>()

@bot.event
<span class="syntax-keyword">async def</span> <span class="syntax-func">on_wavelink_node_ready</span>(payload: wavelink.NodeReadyEventPayload) -> <span class="syntax-keyword">None</span>:
    <span class="syntax-func">print</span>(f<span class="syntax-string">"NodeWave Node successfully connected: {payload.node.identifier}"</span>)

bot.<span class="syntax-func">run</span>(<span class="syntax-string">"YOUR_DISCORD_BOT_TOKEN"</span>)`
        }
    };

    let activeLang = 'js-poru';

    const frameworkBtns = document.querySelectorAll('.framework-btn');
    const codeBlock = document.getElementById('code-block');
    const fileNameEl = document.getElementById('code-file-name');
    const copyBtn = document.getElementById('btn-copy-code');
    const copyStatusText = document.getElementById('copy-status-text');

    if (!codeBlock) return;

    function renderCode(lang) {
        activeLang = lang;
        fileNameEl.textContent = rawSnippets[lang].fileName;
        codeBlock.innerHTML = rawSnippets[lang].codeHTML;
        
        // Remove active class from all and add to current
        frameworkBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    frameworkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            renderCode(lang);
        });
    });

    // Clipboard Copy Action
    copyBtn.addEventListener('click', () => {
        const textToCopy = rawSnippets[activeLang].codeRaw;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyStatusText.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyStatusText.textContent = 'Copy Code';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers or restricted sandboxes
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                copyStatusText.textContent = 'Copied!';
                setTimeout(() => {
                    copyStatusText.textContent = 'Copy Code';
                }, 2000);
            } catch (fallbackErr) {
                copyStatusText.textContent = 'Failed to copy';
            }
            document.body.removeChild(textarea);
        });
    });

    // Initial render
    renderCode('js-poru');
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion Transition
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question-btn');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            // Close all active sibling items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   7. Lavalink Audio Tester (iTunes API Integration)
   -------------------------------------------------------------------------- */
function initAudioTester() {
    const searchInput = document.getElementById('audio-search-input');
    const searchBtn = document.getElementById('btn-audio-search');
    const resultsPanel = document.getElementById('audio-results-panel');
    const playerPanel = document.getElementById('audio-player-panel');

    if (!searchInput || !searchBtn || !resultsPanel || !playerPanel) return;

    // Trigger search on enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    async function performSearch(query) {
        if (!query.trim()) return;

        // Show loading state
        searchBtn.disabled = true;
        searchBtn.textContent = 'Searching...';
        resultsPanel.innerHTML = `
            <div class="empty-state">
                <svg class="animate-pulse" style="animation: spin 1s linear infinite" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <p>Searching tracks...</p>
            </div>
        `;

        try {
            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=6`);
            const data = await response.json();

            resultsPanel.innerHTML = ''; // clear loading state

            if (data.results && data.results.length > 0) {
                data.results.forEach(track => {
                    const item = document.createElement('div');
                    item.className = 'audio-result-item';
                    
                    // High-res artwork for player, low res for list
                    const artworkUrl = track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : '';
                    
                    item.innerHTML = `
                        <img src="${track.artworkUrl100}" alt="Artwork" loading="lazy">
                        <div class="audio-result-info">
                            <div class="audio-result-title" title="${track.trackName}">${track.trackName}</div>
                            <div class="audio-result-artist">${track.artistName}</div>
                        </div>
                    `;

                    // Click handler to play track
                    item.addEventListener('click', () => {
                        playTrack(track.trackName, track.artistName, artworkUrl, track.previewUrl);
                    });

                    resultsPanel.appendChild(item);
                });
            } else {
                resultsPanel.innerHTML = `
                    <div class="empty-state">
                        <p>No songs found for "${query}"</p>
                    </div>
                `;
            }

        } catch (err) {
            console.error('Search failed:', err);
            resultsPanel.innerHTML = `
                <div class="empty-state">
                    <p style="color: #ef4444;">Error fetching results. Try again later.</p>
                </div>
            `;
        } finally {
            searchBtn.disabled = false;
            searchBtn.textContent = 'Search';
        }
    }

    function playTrack(title, artist, artwork, previewUrl) {
        if (!previewUrl) {
            playerPanel.innerHTML = `
                <div class="empty-state">
                    <p style="color: #ef4444;">No audio preview available for this track.</p>
                </div>
            `;
            return;
        }

        playerPanel.innerHTML = `
            <div class="active-player-container" style="animation: fade-in 0.5s ease;">
                <div class="art-wrapper">
                    <img src="${artwork}" alt="${title}" class="active-player-art">
                    <div class="visualizer-overlay">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
                <h3 class="active-player-title">${title}</h3>
                <p class="active-player-artist">${artist}</p>
                <audio class="active-player-audio" controls autoplay name="media">
                    <source src="${previewUrl}" type="audio/x-m4a">
                </audio>
            </div>
        `;

        const audioEl = playerPanel.querySelector('.active-player-audio');
        const artWrapper = playerPanel.querySelector('.art-wrapper');

        audioEl.addEventListener('play', () => {
            artWrapper.classList.add('is-playing');
        });
        audioEl.addEventListener('pause', () => {
            artWrapper.classList.remove('is-playing');
        });
        audioEl.addEventListener('ended', () => {
            artWrapper.classList.remove('is-playing');
        });
    }
}
