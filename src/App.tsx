import { useState, useMemo } from 'react'
import {
  Search, Moon, Sun, ExternalLink, Globe,
  Network, Shield, Server, Code, Wrench, Palette, ArrowRightLeft,
  Radio, Wifi, Router
} from 'lucide-react'
import './App.css'

const BASE = 'https://gmowses.github.io'

interface Tool {
  id: string
  name: string
  desc: string
  descPt: string
  category: string
}

const categories: Record<string, { icon: React.ReactNode; label: string; labelPt: string }> = {
  'Networking & ISP': { icon: <Network className="w-4 h-4" />, label: 'Networking & ISP', labelPt: 'Redes & ISP' },
  'BGP': { icon: <Router className="w-4 h-4" />, label: 'BGP', labelPt: 'BGP' },
  'OSPF & MPLS': { icon: <Radio className="w-4 h-4" />, label: 'OSPF & MPLS', labelPt: 'OSPF & MPLS' },
  'ISP Operations': { icon: <Wifi className="w-4 h-4" />, label: 'ISP Operations', labelPt: 'Operacoes ISP' },
  'Security & Encoding': { icon: <Shield className="w-4 h-4" />, label: 'Security & Encoding', labelPt: 'Seguranca & Encoding' },
  'DevOps & Sysadmin': { icon: <Server className="w-4 h-4" />, label: 'DevOps & Sysadmin', labelPt: 'DevOps & Sysadmin' },
  'Development Tools': { icon: <Code className="w-4 h-4" />, label: 'Development Tools', labelPt: 'Ferramentas Dev' },
  'Web & Design': { icon: <Palette className="w-4 h-4" />, label: 'Web & Design', labelPt: 'Web & Design' },
  'Converters & Utilities': { icon: <ArrowRightLeft className="w-4 h-4" />, label: 'Converters & Utilities', labelPt: 'Conversores & Utilidades' },
  'API & Protocols': { icon: <Wrench className="w-4 h-4" />, label: 'API & Protocols', labelPt: 'API & Protocolos' },
}

const tools: Tool[] = [
  // Networking & ISP (16)
  { id: 'ipv4-calculator', name: 'IPv4 Calculator', desc: 'Subnet calculator with CIDR, wildcard, host range', descPt: 'Calculadora de sub-rede com CIDR, wildcard, faixa de hosts', category: 'Networking & ISP' },
  { id: 'ipv6-calculator', name: 'IPv6 Calculator', desc: 'IPv6 subnet calculator, expand/compress, prefix delegation', descPt: 'Calculadora IPv6, expandir/comprimir, delegacao de prefixo', category: 'Networking & ISP' },
  { id: 'bandwidth-calculator', name: 'Bandwidth Calculator', desc: 'Calculate transfer time, throughput, data usage', descPt: 'Calcular tempo de transferencia, throughput, uso de dados', category: 'Networking & ISP' },
  { id: 'mac-lookup', name: 'MAC Lookup', desc: 'Identify vendor from MAC/OUI address', descPt: 'Identificar fabricante pelo endereco MAC/OUI', category: 'Networking & ISP' },
  { id: 'dns-record-reference', name: 'DNS Record Reference', desc: 'Complete DNS record types reference guide', descPt: 'Guia completo de tipos de registros DNS', category: 'Networking & ISP' },
  { id: 'cidr-overlap-checker', name: 'CIDR Overlap Checker', desc: 'Check if CIDR ranges overlap or conflict', descPt: 'Verificar se faixas CIDR se sobrepoem', category: 'Networking & ISP' },
  { id: 'subnet-cheatsheet', name: 'Subnet Cheatsheet', desc: 'Quick reference for subnet masks and CIDR notation', descPt: 'Referencia rapida de mascaras de sub-rede e CIDR', category: 'Networking & ISP' },
  { id: 'port-reference', name: 'Port Reference', desc: 'Common TCP/UDP ports and services reference', descPt: 'Referencia de portas TCP/UDP e servicos comuns', category: 'Networking & ISP' },
  { id: 'vlan-planner', name: 'VLAN Planner', desc: 'Plan and document VLAN assignments', descPt: 'Planejar e documentar atribuicoes de VLAN', category: 'Networking & ISP' },
  { id: 'mtu-calculator', name: 'MTU Calculator', desc: 'Calculate MTU for tunnels, PPPoE, MPLS, VXLAN', descPt: 'Calcular MTU para tuneis, PPPoE, MPLS, VXLAN', category: 'Networking & ISP' },
  { id: 'wireless-calculator', name: 'Wireless Calculator', desc: 'Free-space path loss, Fresnel zone, link budget', descPt: 'Perda no espaco livre, zona de Fresnel, link budget', category: 'Networking & ISP' },
  { id: 'fiber-loss-calculator', name: 'Fiber Loss Calculator', desc: 'Optical fiber attenuation and power budget', descPt: 'Atenuacao de fibra optica e power budget', category: 'Networking & ISP' },
  { id: 'nat-type-reference', name: 'NAT Type Reference', desc: 'NAT types, traversal techniques, and compatibility', descPt: 'Tipos de NAT, tecnicas de travessia e compatibilidade', category: 'Networking & ISP' },
  { id: 'arp-table-parser', name: 'ARP Table Parser', desc: 'Parse and analyze ARP tables from network devices', descPt: 'Analisar tabelas ARP de dispositivos de rede', category: 'Networking & ISP' },
  { id: 'tcp-flags-reference', name: 'TCP Flags Reference', desc: 'TCP flags, handshake, and connection states', descPt: 'Flags TCP, handshake e estados de conexao', category: 'Networking & ISP' },
  { id: 'bgp-community-reference', name: 'BGP Community Reference', desc: 'Well-known BGP communities and usage guide', descPt: 'Comunidades BGP conhecidas e guia de uso', category: 'Networking & ISP' },

  // BGP (10)
  { id: 'bgp-path-simulator', name: 'BGP Path Simulator', desc: 'Simulate BGP path selection and best path algorithm', descPt: 'Simular selecao de caminho BGP e algoritmo best path', category: 'BGP' },
  { id: 'bgp-regex-builder', name: 'BGP Regex Builder', desc: 'Build and test AS-path regular expressions', descPt: 'Construir e testar expressoes regulares AS-path', category: 'BGP' },
  { id: 'bgp-looking-glass', name: 'BGP Looking Glass', desc: 'Query public BGP looking glass servers', descPt: 'Consultar servidores looking glass BGP publicos', category: 'BGP' },
  { id: 'as-path-analyzer', name: 'AS Path Analyzer', desc: 'Analyze and visualize AS paths', descPt: 'Analisar e visualizar caminhos AS', category: 'BGP' },
  { id: 'bgp-policy-generator', name: 'BGP Policy Generator', desc: 'Generate BGP route-map and policy configs', descPt: 'Gerar configuracoes de route-map e politicas BGP', category: 'BGP' },
  { id: 'bgp-flowspec-reference', name: 'BGP FlowSpec Reference', desc: 'BGP FlowSpec rules, match types, and actions', descPt: 'Regras FlowSpec, tipos de match e acoes', category: 'BGP' },
  { id: 'rpki-reference', name: 'RPKI Reference', desc: 'RPKI validation, ROA, and deployment guide', descPt: 'Validacao RPKI, ROA e guia de implantacao', category: 'BGP' },
  { id: 'irr-object-generator', name: 'IRR Object Generator', desc: 'Generate IRR/RPSL objects for route registration', descPt: 'Gerar objetos IRR/RPSL para registro de rotas', category: 'BGP' },
  { id: 'bgp-table-calculator', name: 'BGP Table Calculator', desc: 'Estimate BGP table size and memory requirements', descPt: 'Estimar tamanho da tabela BGP e requisitos de memoria', category: 'BGP' },
  { id: 'peering-policy-generator', name: 'Peering Policy Generator', desc: 'Generate peering policy documents for IXPs', descPt: 'Gerar documentos de politica de peering para PTTs', category: 'BGP' },

  // OSPF & MPLS (10)
  { id: 'ospf-area-designer', name: 'OSPF Area Designer', desc: 'Design OSPF area topology with stub/NSSA/backbone', descPt: 'Projetar topologia de areas OSPF com stub/NSSA/backbone', category: 'OSPF & MPLS' },
  { id: 'ospf-cost-calculator', name: 'OSPF Cost Calculator', desc: 'Calculate OSPF interface cost from bandwidth', descPt: 'Calcular custo OSPF de interface por largura de banda', category: 'OSPF & MPLS' },
  { id: 'ospf-lsa-reference', name: 'OSPF LSA Reference', desc: 'OSPF LSA types, formats, and flooding scope', descPt: 'Tipos de LSA OSPF, formatos e escopo de flooding', category: 'OSPF & MPLS' },
  { id: 'ospf-neighbor-states', name: 'OSPF Neighbor States', desc: 'OSPF neighbor state machine and troubleshooting', descPt: 'Maquina de estados de vizinhanca OSPF e troubleshooting', category: 'OSPF & MPLS' },
  { id: 'ospf-config-generator', name: 'OSPF Config Generator', desc: 'Generate OSPF configuration for multiple vendors', descPt: 'Gerar configuracao OSPF para multiplos fabricantes', category: 'OSPF & MPLS' },
  { id: 'mpls-label-reference', name: 'MPLS Label Reference', desc: 'MPLS label stack, reserved labels, and operations', descPt: 'Pilha de labels MPLS, labels reservados e operacoes', category: 'OSPF & MPLS' },
  { id: 'mpls-vpn-designer', name: 'MPLS VPN Designer', desc: 'Design L2VPN/L3VPN topologies with RT/RD', descPt: 'Projetar topologias L2VPN/L3VPN com RT/RD', category: 'OSPF & MPLS' },
  { id: 'segment-routing-reference', name: 'Segment Routing Reference', desc: 'SR-MPLS and SRv6 concepts, SID types, and use cases', descPt: 'Conceitos SR-MPLS e SRv6, tipos de SID e casos de uso', category: 'OSPF & MPLS' },
  { id: 'qos-designer', name: 'QoS Designer', desc: 'Design QoS policies with DSCP, queuing, and shaping', descPt: 'Projetar politicas QoS com DSCP, filas e shaping', category: 'OSPF & MPLS' },
  { id: 'ldp-vs-rsvp-reference', name: 'LDP vs RSVP Reference', desc: 'Compare LDP and RSVP-TE for MPLS label distribution', descPt: 'Comparar LDP e RSVP-TE para distribuicao de labels MPLS', category: 'OSPF & MPLS' },

  // ISP Operations (10)
  { id: 'pppoe-calculator', name: 'PPPoE Calculator', desc: 'PPPoE overhead, MTU, and subscriber capacity', descPt: 'Overhead PPPoE, MTU e capacidade de assinantes', category: 'ISP Operations' },
  { id: 'cgnat-calculator', name: 'CGNAT Calculator', desc: 'CGNAT port allocation, public IP sharing ratios', descPt: 'Alocacao de portas CGNAT, razoes de compartilhamento de IP', category: 'ISP Operations' },
  { id: 'traffic-engineering-calc', name: 'Traffic Engineering Calc', desc: 'Calculate bandwidth provisioning and oversubscription', descPt: 'Calcular provisionamento de banda e oversubscription', category: 'ISP Operations' },
  { id: 'sla-calculator-pro', name: 'SLA Calculator Pro', desc: 'Calculate SLA uptime, downtime allowance, and credits', descPt: 'Calcular uptime SLA, tempo de inatividade e creditos', category: 'ISP Operations' },
  { id: 'ip-numbering-plan', name: 'IP Numbering Plan', desc: 'Plan and document IP address allocation for ISPs', descPt: 'Planejar e documentar alocacao de enderecos IP para ISPs', category: 'ISP Operations' },
  { id: 'radius-attribute-reference', name: 'RADIUS Attribute Reference', desc: 'RADIUS attributes, vendor-specific, and dictionaries', descPt: 'Atributos RADIUS, vendor-specific e dicionarios', category: 'ISP Operations' },
  { id: 'snmp-oid-browser', name: 'SNMP OID Browser', desc: 'Browse and search SNMP OID trees and MIBs', descPt: 'Navegar e buscar arvores de OID SNMP e MIBs', category: 'ISP Operations' },
  { id: 'optical-power-calculator', name: 'Optical Power Calculator', desc: 'Calculate optical power budget for GPON/EPON', descPt: 'Calcular power budget optico para GPON/EPON', category: 'ISP Operations' },
  { id: 'pon-splitter-calculator', name: 'PON Splitter Calculator', desc: 'Calculate PON splitter ratios and insertion loss', descPt: 'Calcular razoes de splitter PON e perda de insercao', category: 'ISP Operations' },
  { id: 'anatel-reference', name: 'ANATEL Reference', desc: 'Brazilian telecom regulations and frequency allocations', descPt: 'Regulamentacoes de telecom brasileiras e alocacoes de frequencia', category: 'ISP Operations' },

  // Security & Encoding (9)
  { id: 'password-generator', name: 'Password Generator', desc: 'Generate secure passwords with custom rules', descPt: 'Gerar senhas seguras com regras personalizadas', category: 'Security & Encoding' },
  { id: 'hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes', descPt: 'Gerar hashes MD5, SHA-1, SHA-256, SHA-512', category: 'Security & Encoding' },
  { id: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens', descPt: 'Decodificar e inspecionar JSON Web Tokens', category: 'Security & Encoding' },
  { id: 'base64-codec', name: 'Base64 Codec', desc: 'Encode and decode Base64 strings and files', descPt: 'Codificar e decodificar strings e arquivos Base64', category: 'Security & Encoding' },
  { id: 'ssl-decoder', name: 'SSL Decoder', desc: 'Decode SSL/TLS certificates and CSRs', descPt: 'Decodificar certificados SSL/TLS e CSRs', category: 'Security & Encoding' },
  { id: 'uuid-generator', name: 'UUID Generator', desc: 'Generate UUIDs v1, v4, v5, v7 with bulk mode', descPt: 'Gerar UUIDs v1, v4, v5, v7 com modo em lote', category: 'Security & Encoding' },
  { id: 'random-data-generator', name: 'Random Data Generator', desc: 'Generate random names, emails, addresses, IPs', descPt: 'Gerar nomes, emails, enderecos, IPs aleatorios', category: 'Security & Encoding' },
  { id: 'cors-tester', name: 'CORS Tester', desc: 'Test and debug CORS headers and preflight requests', descPt: 'Testar e debugar headers CORS e requisicoes preflight', category: 'Security & Encoding' },
  { id: 'secret-sharing', name: 'Secret Sharing', desc: "Shamir's Secret Sharing - split secrets into shares", descPt: 'Compartilhamento de Segredos de Shamir - dividir segredos', category: 'Security & Encoding' },

  // DevOps & Sysadmin (11)
  { id: 'cron-builder', name: 'Cron Builder', desc: 'Build and validate cron expressions visually', descPt: 'Construir e validar expressoes cron visualmente', category: 'DevOps & Sysadmin' },
  { id: 'chmod-calculator', name: 'Chmod Calculator', desc: 'Calculate Unix file permissions in octal and symbolic', descPt: 'Calcular permissoes Unix em octal e simbolico', category: 'DevOps & Sysadmin' },
  { id: 'docker-compose-generator', name: 'Docker Compose Generator', desc: 'Generate docker-compose.yml with common services', descPt: 'Gerar docker-compose.yml com servicos comuns', category: 'DevOps & Sysadmin' },
  { id: 'nginx-config-generator', name: 'Nginx Config Generator', desc: 'Generate Nginx configurations for common setups', descPt: 'Gerar configuracoes Nginx para cenarios comuns', category: 'DevOps & Sysadmin' },
  { id: 'systemd-unit-generator', name: 'Systemd Unit Generator', desc: 'Generate systemd service, timer, and socket units', descPt: 'Gerar units systemd de servico, timer e socket', category: 'DevOps & Sysadmin' },
  { id: 'k8s-yaml-generator', name: 'K8s YAML Generator', desc: 'Generate Kubernetes manifests for common resources', descPt: 'Gerar manifests Kubernetes para recursos comuns', category: 'DevOps & Sysadmin' },
  { id: 'gitignore-generator', name: 'Gitignore Generator', desc: 'Generate .gitignore for any tech stack', descPt: 'Gerar .gitignore para qualquer stack', category: 'DevOps & Sysadmin' },
  { id: 'uptime-calculator', name: 'Uptime Calculator', desc: 'Calculate uptime percentage and allowed downtime', descPt: 'Calcular percentual de uptime e downtime permitido', category: 'DevOps & Sysadmin' },
  { id: 'log-parser', name: 'Log Parser', desc: 'Parse and filter log files with pattern matching', descPt: 'Analisar e filtrar arquivos de log com pattern matching', category: 'DevOps & Sysadmin' },
  { id: 'linux-signals-reference', name: 'Linux Signals Reference', desc: 'Linux signal numbers, names, default actions', descPt: 'Numeros de sinais Linux, nomes, acoes padrao', category: 'DevOps & Sysadmin' },
  { id: 'exit-code-reference', name: 'Exit Code Reference', desc: 'Common exit codes for bash, HTTP, SMTP, and more', descPt: 'Codigos de saida comuns para bash, HTTP, SMTP e mais', category: 'DevOps & Sysadmin' },

  // Development Tools (19)
  { id: 'json-formatter', name: 'JSON Formatter', desc: 'Format, validate, and minify JSON data', descPt: 'Formatar, validar e minificar dados JSON', category: 'Development Tools' },
  { id: 'yaml-json-converter', name: 'YAML/JSON Converter', desc: 'Convert between YAML and JSON formats', descPt: 'Converter entre formatos YAML e JSON', category: 'Development Tools' },
  { id: 'regex-playground', name: 'Regex Playground', desc: 'Test and debug regular expressions with highlighting', descPt: 'Testar e debugar expressoes regulares com destaque', category: 'Development Tools' },
  { id: 'diff-checker', name: 'Diff Checker', desc: 'Compare two texts and show differences', descPt: 'Comparar dois textos e mostrar diferencas', category: 'Development Tools' },
  { id: 'timestamp-converter', name: 'Timestamp Converter', desc: 'Convert between Unix timestamps and dates', descPt: 'Converter entre timestamps Unix e datas', category: 'Development Tools' },
  { id: 'http-status', name: 'HTTP Status', desc: 'HTTP status codes reference with descriptions', descPt: 'Referencia de codigos de status HTTP com descricoes', category: 'Development Tools' },
  { id: 'color-converter', name: 'Color Converter', desc: 'Convert colors between HEX, RGB, HSL formats', descPt: 'Converter cores entre formatos HEX, RGB, HSL', category: 'Development Tools' },
  { id: 'markdown-preview', name: 'Markdown Preview', desc: 'Live markdown editor with preview', descPt: 'Editor markdown ao vivo com preview', category: 'Development Tools' },
  { id: 'url-parser', name: 'URL Parser', desc: 'Parse and analyze URL components', descPt: 'Analisar e decompor componentes de URL', category: 'Development Tools' },
  { id: 'sql-formatter', name: 'SQL Formatter', desc: 'Format and beautify SQL queries', descPt: 'Formatar e embelezar queries SQL', category: 'Development Tools' },
  { id: 'csv-to-json', name: 'CSV to JSON', desc: 'Convert CSV data to JSON format', descPt: 'Converter dados CSV para formato JSON', category: 'Development Tools' },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for designs', descPt: 'Gerar texto placeholder para designs', category: 'Development Tools' },
  { id: 'qr-code-generator', name: 'QR Code Generator', desc: 'Generate QR codes for URLs, text, WiFi', descPt: 'Gerar QR codes para URLs, texto, WiFi', category: 'Development Tools' },
  { id: 'api-response-formatter', name: 'API Response Formatter', desc: 'Format and inspect API responses (JSON/XML)', descPt: 'Formatar e inspecionar respostas de API (JSON/XML)', category: 'Development Tools' },
  { id: 'curl-to-code', name: 'cURL to Code', desc: 'Convert cURL commands to Python, JS, Go, PHP', descPt: 'Converter comandos cURL para Python, JS, Go, PHP', category: 'Development Tools' },
  { id: 'xml-to-json', name: 'XML to JSON', desc: 'Convert between XML and JSON formats', descPt: 'Converter entre formatos XML e JSON', category: 'Development Tools' },
  { id: 'html-entity-encoder', name: 'HTML Entity Encoder', desc: 'Encode and decode HTML entities', descPt: 'Codificar e decodificar entidades HTML', category: 'Development Tools' },
  { id: 'string-case-converter', name: 'String Case Converter', desc: 'Convert between camelCase, snake_case, kebab-case', descPt: 'Converter entre camelCase, snake_case, kebab-case', category: 'Development Tools' },
  { id: 'code-screenshot', name: 'Code Screenshot', desc: 'Create beautiful code screenshots for sharing', descPt: 'Criar screenshots de codigo bonitos para compartilhar', category: 'Development Tools' },

  // Web & Design (10)
  { id: 'aspect-ratio-calculator', name: 'Aspect Ratio Calculator', desc: 'Calculate and convert aspect ratios for media', descPt: 'Calcular e converter proporcoes de tela para midia', category: 'Web & Design' },
  { id: 'box-shadow-generator', name: 'Box Shadow Generator', desc: 'Visual CSS box-shadow generator with layers', descPt: 'Gerador visual de CSS box-shadow com camadas', category: 'Web & Design' },
  { id: 'css-grid-generator', name: 'CSS Grid Generator', desc: 'Visual CSS Grid layout builder with code export', descPt: 'Construtor visual de CSS Grid com exportacao de codigo', category: 'Web & Design' },
  { id: 'flexbox-playground', name: 'Flexbox Playground', desc: 'Interactive CSS Flexbox property explorer', descPt: 'Explorador interativo de propriedades CSS Flexbox', category: 'Web & Design' },
  { id: 'gradient-generator', name: 'Gradient Generator', desc: 'Create CSS gradients with visual editor', descPt: 'Criar gradientes CSS com editor visual', category: 'Web & Design' },
  { id: 'favicon-generator', name: 'Favicon Generator', desc: 'Generate favicons from text, emoji, or image', descPt: 'Gerar favicons a partir de texto, emoji ou imagem', category: 'Web & Design' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', desc: 'Generate HTML meta tags for SEO and social', descPt: 'Gerar meta tags HTML para SEO e redes sociais', category: 'Web & Design' },
  { id: 'robots-txt-generator', name: 'Robots.txt Generator', desc: 'Generate robots.txt for search engine crawlers', descPt: 'Gerar robots.txt para crawlers de busca', category: 'Web & Design' },
  { id: 'sitemap-generator', name: 'Sitemap Generator', desc: 'Generate XML sitemaps for websites', descPt: 'Gerar sitemaps XML para websites', category: 'Web & Design' },
  { id: 'svg-optimizer', name: 'SVG Optimizer', desc: 'Optimize and minify SVG files', descPt: 'Otimizar e minificar arquivos SVG', category: 'Web & Design' },

  // Converters & Utilities (12)
  { id: 'byte-converter', name: 'Byte Converter', desc: 'Convert between bytes, KB, MB, GB, TB', descPt: 'Converter entre bytes, KB, MB, GB, TB', category: 'Converters & Utilities' },
  { id: 'number-base-converter', name: 'Number Base Converter', desc: 'Convert between binary, octal, decimal, hex', descPt: 'Converter entre binario, octal, decimal, hexadecimal', category: 'Converters & Utilities' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Calculate percentages, increases, and ratios', descPt: 'Calcular percentuais, aumentos e razoes', category: 'Converters & Utilities' },
  { id: 'unit-converter', name: 'Unit Converter', desc: 'Convert between length, weight, temperature units', descPt: 'Converter entre unidades de comprimento, peso, temperatura', category: 'Converters & Utilities' },
  { id: 'binary-text-converter', name: 'Binary Text Converter', desc: 'Convert between binary and text/ASCII', descPt: 'Converter entre binario e texto/ASCII', category: 'Converters & Utilities' },
  { id: 'unicode-lookup', name: 'Unicode Lookup', desc: 'Search and browse Unicode characters', descPt: 'Buscar e navegar caracteres Unicode', category: 'Converters & Utilities' },
  { id: 'morse-code-translator', name: 'Morse Code Translator', desc: 'Translate text to/from Morse code with audio', descPt: 'Traduzir texto para/de codigo Morse com audio', category: 'Converters & Utilities' },
  { id: 'text-statistics', name: 'Text Statistics', desc: 'Count words, characters, sentences, reading time', descPt: 'Contar palavras, caracteres, frases, tempo de leitura', category: 'Converters & Utilities' },
  { id: 'countdown-timer', name: 'Countdown Timer', desc: 'Customizable countdown timer with alerts', descPt: 'Timer de contagem regressiva personalizavel com alertas', category: 'Converters & Utilities' },
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', desc: 'Pomodoro technique timer with sessions tracking', descPt: 'Timer da tecnica Pomodoro com rastreamento de sessoes', category: 'Converters & Utilities' },
  { id: 'typing-speed-test', name: 'Typing Speed Test', desc: 'Test your typing speed and accuracy (WPM)', descPt: 'Teste sua velocidade e precisao de digitacao (WPM)', category: 'Converters & Utilities' },
  { id: 'pi-digits', name: 'Pi Digits', desc: 'Explore digits of Pi with search and copy', descPt: 'Explorar digitos de Pi com busca e copia', category: 'Converters & Utilities' },

  // API & Protocols (4)
  { id: 'http-headers-reference', name: 'HTTP Headers Reference', desc: 'Complete HTTP headers reference with examples', descPt: 'Referencia completa de headers HTTP com exemplos', category: 'API & Protocols' },
  { id: 'mime-type-reference', name: 'MIME Type Reference', desc: 'MIME types for file extensions and content types', descPt: 'Tipos MIME para extensoes de arquivo e content types', category: 'API & Protocols' },
  { id: 'smtp-code-reference', name: 'SMTP Code Reference', desc: 'SMTP response codes and their meanings', descPt: 'Codigos de resposta SMTP e seus significados', category: 'API & Protocols' },
  { id: 'oauth-flow-visualizer', name: 'OAuth Flow Visualizer', desc: 'Visualize OAuth 2.0 / OIDC flows and grants', descPt: 'Visualizar fluxos e grants OAuth 2.0 / OIDC', category: 'API & Protocols' },
]

type Lang = 'en' | 'pt'

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cf-dark')
      if (saved !== null) return saved === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cf-lang')
      if (saved === 'en' || saved === 'pt') return saved
      return navigator.language.startsWith('pt') ? 'pt' : 'en'
    }
    return 'en'
  })
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('cf-dark', String(next))
    document.documentElement.classList.toggle('dark', next)
  }

  const toggleLang = () => {
    const next = lang === 'en' ? 'pt' : 'en'
    setLang(next)
    localStorage.setItem('cf-lang', next)
  }

  // Initialize dark class
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark)
  }

  const filtered = useMemo(() => {
    let result = tools
    if (activeCategory) {
      result = result.filter(t => t.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.descPt.toLowerCase().includes(q) ||
        t.id.includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, activeCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const t of tools) {
      counts[t.category] = (counts[t.category] || 0) + 1
    }
    return counts
  }, [])

  const t = {
    en: {
      subtitle: 'Open Source Developer Tools',
      heroDesc: `${tools.length} free tools for networking, security, DevOps & telecom. All client-side, no data leaves your browser.`,
      searchPlaceholder: 'Search tools...',
      allCategories: 'All',
      openTool: 'Open',
      madeBy: 'Made by',
      tools: 'tools',
      footer: 'All tools are open source (MIT), run entirely in your browser, and support dark/light mode with EN/PT-BR.',
    },
    pt: {
      subtitle: 'Ferramentas Open Source para Desenvolvedores',
      heroDesc: `${tools.length} ferramentas gratuitas para redes, seguranca, DevOps e telecom. Tudo roda no navegador, nenhum dado sai do seu browser.`,
      searchPlaceholder: 'Buscar ferramentas...',
      allCategories: 'Todas',
      openTool: 'Abrir',
      madeBy: 'Feito por',
      tools: 'ferramentas',
      footer: 'Todas as ferramentas sao open source (MIT), rodam inteiramente no navegador e suportam modo escuro/claro com EN/PT-BR.',
    },
  }[lang]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A3EC] flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-[#00A3EC]">Cloud</span>
              <span>Face</span>
              <span className="text-gray-400 dark:text-gray-500 font-normal ml-1.5">Tools</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle dark mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="https://github.com/gmowses"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-[#00A3EC]">Cloud</span>Face {t.subtitle.split(' ')[0] === 'Open' ? '' : ''}
            <span className="block text-2xl sm:text-3xl font-semibold text-gray-500 dark:text-gray-400 mt-2">{t.subtitle}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            {t.heroDesc}
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3EC]/50 focus:border-[#00A3EC] text-lg transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-[#00A3EC] text-white'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-[#00A3EC]/50'
            }`}
          >
            {t.allCategories}
            <span className="text-xs opacity-70">({tools.length})</span>
          </button>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-[#00A3EC] text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-[#00A3EC]/50'
              }`}
            >
              {cat.icon}
              {lang === 'pt' ? cat.labelPt : cat.label}
              <span className="text-xs opacity-70">({categoryCounts[key] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">{lang === 'pt' ? 'Nenhuma ferramenta encontrada' : 'No tools found'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(tool => (
              <a
                key={tool.id}
                href={`${BASE}/${tool.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#00A3EC]/50 dark:hover:border-[#00A3EC]/50 hover:shadow-lg hover:shadow-[#00A3EC]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#00A3EC] bg-[#00A3EC]/10 px-2 py-1 rounded-md">
                    {categories[tool.category]?.icon}
                    {lang === 'pt' ? categories[tool.category]?.labelPt : categories[tool.category]?.label}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#00A3EC] transition-colors" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5 group-hover:text-[#00A3EC] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {lang === 'pt' ? tool.descPt : tool.desc}
                </p>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {t.footer}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {t.madeBy}{' '}
            <a href="https://github.com/gmowses" target="_blank" rel="noopener noreferrer" className="text-[#00A3EC] hover:underline">
              Gabriel Mowses
            </a>
            {' '}&middot; {tools.length} {t.tools} &middot; MIT License
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
